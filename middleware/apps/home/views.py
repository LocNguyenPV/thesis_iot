# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

import datetime
import imp
import json
import time
from tkinter import Label
from unicodedata import name
from django import template
from django.contrib.auth.decorators import login_required
from django.forms import model_to_dict
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect
from django.template import loader
from django.urls import reverse
import kafka
from apps.home.models import CronJob, Sensor, SensorLabel, SensorRequest
from apps.home.__sensor_reading.handler import kafka_handler

@login_required(login_url="/login/")
def index(request):
    data = SensorRequest.objects.all()
    monitors = Sensor.objects.filter(is_monitor=True)
    context = {'segment': 'index', 'data': data, 'monitors': monitors}
    html_template = loader.get_template('home/index.html')
    return HttpResponse(html_template.render(context, request))


@login_required(login_url="/login/")
def create(request):
    html_template = loader.get_template('home/create-sensor.html')
    context = {'segment': 'sensors'}
    if request.method == 'POST':
        form_data = request.POST
        print(form_data)
        sensor = Sensor(
            address=form_data['address'], name=form_data['name'], status=1)
        sensor.save()
        labels = form_data.getlist('labels')
        print(labels)
        index = 0
        while index < len(labels):

            label = SensorLabel(
                address=labels[index + 1], name=labels[index], sensor_address=sensor, chart_type=labels[index + 2])
            label.save()
            # sensor_req = SensorRequest(address = sensor.address + ',' + label.address, chart_type = label.chart_type, sensor_name = sensor.name, label = label.name)
            sensor_req = SensorRequest(
                sensor_address=sensor, label_address=label, chart_type=label.chart_type)
            sensor_req.save()
            index += 3
        return redirect('sensors')
    return HttpResponse(html_template.render(context, request))


@login_required(login_url="/login/")
def create_monitor(request):
    html_template = loader.get_template('home/create-monitor.html')
    context = {'segment': 'sensors'}
    if request.method == 'POST':
        form_data = request.POST
        print(form_data)
        sensor = Sensor(
            address=form_data['address'], name=form_data['name'], status=1, is_monitor=True, address_off=form_data['address_off'])
        sensor.save()
        return redirect('sensors')
    return HttpResponse(html_template.render(context, request))


@login_required(login_url="/login/")
def update(request, address):
    sensor = Sensor.objects.get(address=address)
    labels = SensorLabel.objects.filter(sensor_address=sensor)
    context = {'segment': 'sensors', 'sensor': sensor, 'labels': labels}
    html_template = loader.get_template('home/update-sensor.html')
    if request.method == 'POST':
        form_data = request.POST
        sensor.name = form_data['name']
        sensor.save()
        labels = form_data.getlist('labels')
        print(labels)
        old_labels = SensorLabel.objects.filter(sensor_address=sensor)
        old_req = SensorRequest.objects.filter(sensor_address=sensor)
        old_labels.delete()
        old_req.delete()
        index = 0
        while index < len(labels):

            if(labels[index] != "" and labels[index + 1] != ""):
                label = SensorLabel(
                    address=labels[index + 1], name=labels[index], sensor_address=sensor, chart_type=labels[index + 2])
                label.save()
                # sensor_req = SensorRequest(address = sensor.address + ',' + label.address, chart_type = label.chart_type, sensor_name = sensor.name, label = label.name)
                sensor_req = SensorRequest(
                    sensor_address=sensor, label_address=label, chart_type=label.chart_type)
                sensor_req.save()
            index += 3
        return redirect('sensors')
    return HttpResponse(html_template.render(context, request))


@login_required(login_url="/login/")
def update_monitor(request, address):
    sensor = Sensor.objects.get(address=address)
    context = {'segment': 'sensors', 'sensor': sensor}
    html_template = loader.get_template('home/update-monitor.html')
    if request.method == 'POST':
        form_data = request.POST
        sensor.name = form_data['name']
        sensor.address_off = form_data['address_off']
        sensor.save()
        return redirect('sensors')
    return HttpResponse(html_template.render(context, request))


@login_required(login_url="/login/")
def sensors(request):
    data = Sensor.objects.all()
    monitors = data.filter(is_monitor=True)
    sensors = data.filter(is_monitor=False)
    # for item in data:
    #     item['address'] = model_to_dict(item['address'])
    #     item['chart_type'] = model_to_dict(item['chart_type'])
    context = {'segment': 'sensors', 'sensors': sensors, 'monitors': monitors}
    # test = SensorRequest.objects.all()
    # for item in test:
    #     print(item.address)
    html_template = loader.get_template('home/sensors.html')
    return HttpResponse(html_template.render(context, request))


@login_required(login_url="/login/")
def remove(request, address):
    data = Sensor.objects.get(address=address)
    data.delete()
    return redirect('sensors')


@login_required(login_url="/login/")
def trigger_monitor(request):
    form_data = request.POST
    data = Sensor.objects.get(address=form_data['address'])
    if(data.status == 1):
        data.status = 0
        address = data.address_off
    else:
        data.status = 1
        address = data.address
    data.save()
    kafka_handler.pub("automation_data", {"requests": address})
    return redirect('sensors')

@login_required(login_url="/login/")
def schedule_monitor(request, address):
    sensor = Sensor.objects.get(address=address)
    if not sensor.is_monitor:
        return redirect('sensors')
    context = {'segment': 'sensors', 'sensor': sensor}
    html_template = loader.get_template('home/schedule-monitor.html')
    if request.method == 'POST':
        form_data = request.POST
        cron_on_condition = form_data['cron-on-condition']
        cron_off_condition = form_data['cron-off-condition']
        if(cron_on_condition.strip() != ""):
            cron_on = CronJob(sensor_address=sensor, address=sensor.address,
                              name=sensor.name + "_ON", condition=cron_on_condition)
            cron_on.save()
            set_cron(cron_on_condition, sensor.address, cron_on.name)
        if(cron_off_condition.strip() != ""):
            cron_off = CronJob(sensor_address=sensor, address=sensor.address_off,
                               name=sensor.name + "_OFF", condition=cron_off_condition)
            cron_off.save()
            set_cron(cron_off_condition, sensor.address_off, cron_off.name)
        print("Write Cron")
        return redirect('sensors')
    return HttpResponse(html_template.render(context, request))


def set_cron(condition, address, name):
    try:
        tab = CronTab(tabfile='apps\home\MyScripts.tab')
        job = tab.new(command='python apps\home\__sensor_reading\cron.py {0}'.format(
            address), comment=name)
        job.setall(condition)
        tab.write('apps\home\MyScripts.tab')
        print(tab)
    except Exception as ex:
        print(ex)


@login_required(login_url="/login/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:

        load_template = request.path.split('/')[-1]

        if load_template == 'admin':
            return HttpResponseRedirect(reverse('admin:index'))
        context['segment'] = load_template

        html_template = loader.get_template('home/' + load_template)
        return HttpResponse(html_template.render(context, request))

    except template.TemplateDoesNotExist:

        html_template = loader.get_template('home/page-404.html')
        return HttpResponse(html_template.render(context, request))

    except:
        html_template = loader.get_template('home/page-500.html')
        return HttpResponse(html_template.render(context, request))
