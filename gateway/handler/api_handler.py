import os
import requests
from urllib.parse import urljoin
from dotenv import load_dotenv
import json

class APIHandler():

    DOMAIN = None
    URL_REQUEST = None

    def __init__(self):
        load_dotenv()
        global DOMAIN
        global URL_REQUEST
        DOMAIN = os.getenv("API_DOMAIN")
        URL_REQUEST = os.getenv("API_REQUESTS")

    # GET list device


    # def get_devices():
    #     response = requests.get(URL_LIST)
    #     print(response.json())


    def get_request():
        url = DOMAIN + URL_REQUEST
        response = requests.get(url)
        return response.json()


    # POST new device
    # def create_device(deviceInfo):
    #     headers_config = {
    #         'content-type': 'application/json',
    #         'Accept': 'application/json',
    #         'connection': 'keep-alive',
    #         'Expect': '100-continue',
    #     }
    #     #format: {"name": "loc_test_6"}
    #     payload = json.dumps(deviceInfo)
    #     response = requests.post(
    #         URL_CREATE, data=payload, headers=headers_config)
    #     print(response.text)
