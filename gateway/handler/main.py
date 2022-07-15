from argparse import ONE_OR_MORE
import os
from datetime import datetime
from kafka import KafkaProducer, KafkaConsumer
import requests
from urllib.parse import urljoin
from dotenv import load_dotenv
import json
import paho.mqtt.client as mqtt

class APIHandler:
    domain = None
    url_request = None

    def __init__(self):
        load_dotenv()
        self.domain = os.getenv("API_DOMAIN")
        self.url_request = os.getenv("API_REQUESTS")

    def get_request(self):
        full_url = self.domain + self.url_request
        response = requests.get(full_url)
        return response.json()

class KafkaHandler:

    bootstrap_servers = None
    topic = None

    def __init__(self, topic):
        load_dotenv()
        self.bootstrap_servers = os.getenv("KAFKA_BOOTSTRAP_SERVERS_LOCAL")
        self.topic = topic
    
    def pub(self, mess):
        producer = KafkaProducer(
            bootstrap_servers=self.bootstrap_servers,
            value_serializer=lambda v: json.dumps(v).encode('utf-8'),
            compression_type='gzip'
        )
        result = producer.send(self.topic, mess)
        return result
        
    def sub(self, listener):
        consumer = KafkaConsumer(
            self.topic,
            bootstrap_servers=self.bootstrap_servers,
        )
        consumer.poll(timeout_ms=6000)
        for msg in consumer:
            listener(msg)

class MQTTHandler:

    mqtt_broker = None
    mqtt_client = None
    topic = None
    
    def __init__(self, id, topic):
        self.mqtt_broker = "mqtt.eclipseprojects.io"
        self.mqtt_client = mqtt.Client(id)
        self.mqtt_client.connect(self.mqtt_broker)
        self.kafka_instance = KafkaHandler()
        self.topic = topic
    
    def pub(self, message):
        self.mqtt_client.publish(self.topic, message)

    def sub(self, callback):
        self.mqtt_client.loop_forever()
        self.mqtt_client.subscribe(self.topic)
        self.mqtt_client.on_message = callback



class BridgeMQTT2KafkaHandler:

    mqtt_instance = None
    kafka_instance = None
    topic = None

    def __init__(self, id, topic):
        self.mqtt_instance = MQTTHandler(id, topic)
        self.kafka_instance = KafkaHandler(topic)
        self.topic = topic
    
    def on_message(client, userdata, message):
        msg_payload = str(message.payload)
        print("Received MQTT message: ", msg_payload)
        client.kafka_instance.pub(msg_payload.encode('ascii'))
        # print("KAFKA: Just published " + msg_payload + " to topic temperature2")

    def run(self):
        self.mqtt_instance.sub(self.on_message)
        