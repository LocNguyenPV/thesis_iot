from rest_framework import serializers
from apps.home.models import SensorRequest

class SensorRequestSerializer(serializers.ModelSerializer):
    label_address = serializers.CharField(source='label_address.address')

    class Meta:
        model = SensorRequest
        fields = ['sensor_address', 'label_address']