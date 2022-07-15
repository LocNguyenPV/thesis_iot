from django.urls import re_path

from . import consumer

websocket_urlpatterns = [
    re_path('ws/stream/', consumer.ServerSentEventsConsumer.as_asgi()),
]