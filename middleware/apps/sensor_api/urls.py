from django.conf.urls import url
from django.urls import path, include
from .views import (
    SensorRequestListApiView,
)
urlpatterns = [
    path('sensor_requests', SensorRequestListApiView.as_view()),
]