# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.db import models

# Create your models here.
class Sensor(models.Model):
    address = models.CharField(max_length=200)
    name = models.CharField(max_length=1000)
    