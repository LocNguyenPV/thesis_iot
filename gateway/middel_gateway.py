import os
import apps.home.__sensor_reading.handler.ai_detection as AI
from keras.models import load_model
import cv2
from pickle import TRUE
import time
import threading
from numpy import append
from requests import request
import schedule
import queue
import apps.home.__sensor_reading.utils.crc_modbus_16_calculation as chkSum
from apps.home.__sensor_reading.handler.main import APIHandler
from apps.home.__sensor_reading.handler.main import KafkaHandler 
from apps.home.__sensor_reading.handler.main import MQTTHandler 
from apps.home.__sensor_reading.handler.main import BridgeMQTT2KafkaHandler 
import apps.home.__sensor_reading.handler.modbus_serial_connect as sensor_connect
import sentry_sdk
import logging
import serial.serialutil as serial_util
import json
from collections import deque

sentry_sdk.init(
    "https://df1d0f6c65214be9b14737b8d26cde07@o1266351.ingest.sentry.io/6458960",

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=1
)

TOPIC_SENSOR_DATA = "sensor_data"
TOPIC_TRIGGER = "automation_data"

list_request = []
job_queue = queue.Queue()
response_queue = deque()
mqtt_instance_sensor_data = MQTTHandler(id = "MQTTSensor", topic = TOPIC_SENSOR_DATA)
mqtt_instance_trigger = MQTTHandler(id = "MQTTTrigger", topic = TOPIC_TRIGGER)
bridge_mqtt_kafka = BridgeMQTT2KafkaHandler(id = "BridgeMQTT2Kafka", topic = TOPIC_SENSOR_DATA)
api_instance = APIHandler()


def fetch_api():
    global list_request
    list_result = api_instance.get_request()
    list_request = list_result


def pub_response():
    while True:
        if(len(response_queue) > 0):
            response = response_queue.pop()
            mqtt_instance_sensor_data.pub({'address': response["address"], 'value': response["value"], 'time': time.strftime("%H:%M:%S", time.localtime())})


def send_request():
    try:
        for request in list_request:
            obj_request = {
                "requests": "",
                "address": ""
            }
            # calc check sum
            item_request = []
            address = request.sensor_address + ',' + request.label_address
            address_split = address.split(",")
            item_request.append(address_split[0])
            item_request.append(address_split[1])
            item_request.append(address_split[2])
            item_request.append(address_split[3])
            item_request.append(address_split[4])
            item_request.append(address_split[5])
            obj_request["requests"] = chkSum.generate_modbus_message(item_request)
            value_sensor = sensor_connect.sendRequestToSensor(obj_request)
            response_queue.append({"address": address, "value": value_sensor})
    except Exception as general_exception:
            print(general_exception)


def automation_trigger(message):
    obj = json.loads(message.value)
    obj["requests"] = chkSum.generate_modbus_message(obj["requests"].split(","))
    sensor_connect.sendRequestToSensor(obj)


def worker_main():
    while 1:
        job_func = job_queue.get()
        job_func()
        job_queue.task_done()


schedule.every(5).seconds.do(job_queue.put, send_request)
schedule.every(1).minutes.do(job_queue.put, fetch_api)


def start():
    try:
        print("Process start")
        fetch_api()
        bridge_mqtt_kafka.run()
        mqtt_instance_trigger.sub(automation_trigger)
        sensor_connect.startProcesses()
        worker_thread_request = threading.Thread(target=worker_main)
        worker_thread_response = threading.Thread(target=pub_response)
        # worker_thread_automation = threading.Thread(target=mqtt_instance_trigger.sub, args=(automation_trigger))
        worker_thread_request.setDaemon(True)
        # worker_thread_automation.setDaemon(True)
        worker_thread_response.setDaemon(True)

        worker_thread_request.start()
        # worker_thread_automation.start()
        worker_thread_response.start()

        loop_forever = True
        while loop_forever:
            try:
                schedule.run_pending()
                time.sleep(1)
            except KeyboardInterrupt:
                loop_forever = False
    except serial_util.SerialException as serial_exception:
        sentry_sdk.capture_exception(serial_exception)
        logging.exception(serial_exception)
    except Exception as general_exception:
        sentry_sdk.capture_exception(general_exception)
        logging.exception(general_exception)
    finally:
        print("Process End")
        # cam.release()
        # cv2.destroyAllWindows()


if __name__ == '__main__':
    start()
