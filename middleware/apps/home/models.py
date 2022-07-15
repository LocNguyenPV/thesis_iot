# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.db import models
from datetime import date
from django.contrib.auth.models import User

# Create your models here.
class Sensor(models.Model):
    address = models.CharField(max_length=200, primary_key=True)
    address_off = models.CharField(max_length=200, default="")
    name = models.CharField(max_length=1000)
    is_group = models.BooleanField(default=False)
    is_monitor = models.BooleanField(default=False)
    status = models.IntegerField(default=0)
    created_at = models.DateField(default=date.today)
    updated_at = models.DateField(default=date.today)
    def __str__(self):
        return self.name

class SensorLabel(models.Model):
    address = models.CharField(max_length=200)
    name = models.CharField(max_length=1000)
    chart_type = models.CharField(max_length=100)
    sensor_address = models.ForeignKey(Sensor, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class SensorRequest(models.Model):
    # address = models.CharField(max_length=1000)
    sensor_address = models.ForeignKey(Sensor, on_delete=models.CASCADE, default=0)
    label_address = models.ForeignKey(SensorLabel, on_delete=models.CASCADE, default=0)
    chart_type = models.CharField(max_length=100)
    # sensor_name = models.CharField(max_length=1000)
    # label = models.CharField(max_length=1000)
    def __str__(self):
        return self.chart_type
