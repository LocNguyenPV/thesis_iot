import time
import datetime
import threading
from django.apps import AppConfig
from django_eventstream import send_event
from kafka import KafkaConsumer
# import django
# django.setup()
class SSEConfig(AppConfig):
    name = 'apps'

    def ready(self):
        ensure_worker_started()


worker_started = False
process_started = False


def ensure_worker_started():
    global worker_started

    if worker_started:
        return

    if not is_db_ready():
        return

    worker_started = True
    thread_kafka = threading.Thread(target=send_worker)
    thread_kafka.daemon = True
    thread_kafka.start()


def send_worker():
    consumer = KafkaConsumer('sensor_data', bootstrap_servers=["localhost:9092"])
    consumer.poll(timeout_ms=6000)
    for msg in consumer:    
        send_event('chart_data', 'message', {'text': msg.value.decode("utf-8")})


def is_db_ready():
    from django.db import DatabaseError
    from django_eventstream.models import Event
    try:
        # see if db tables are present
        Event.objects.count()
        return True
    except DatabaseError:
        return False
