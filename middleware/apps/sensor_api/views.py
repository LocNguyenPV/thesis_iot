from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from apps.home.models import SensorRequest
from .serializers import SensorRequestSerializer
# Create your views here.
class SensorRequestListApiView(APIView):
    # 1. List all
    def get(self, request, *args, **kwargs):
        '''
        List all the sensor available request
        '''
        sensors = SensorRequest.objects.all()
        serializer = SensorRequestSerializer(sensors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)