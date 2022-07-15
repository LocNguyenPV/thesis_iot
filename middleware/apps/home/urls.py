# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from apps.home import views

urlpatterns = [

    # The home page
    path('', views.index, name='home'),

    path('sensors', views.sensors, name='sensors'),
    path('create', views.create, name='create'),
    path('remove/<str:address>', views.remove, name='remove'),
    path('update/<str:address>', views.update, name='update'),
    path('create_monitor', views.create_monitor, name='create_monitor'),
    path('update_monitor/<str:address>', views.update_monitor, name='update_monitor'),
    # path('schedule_monitor/<str:address>', views.schedule_monitor, name='schedule_monitor'),
    path('trigger_monitor', views.trigger_monitor, name='trigger_monitor'),
    # Matches any html file
    re_path(r'^.*\.*', views.pages, name='pages'),

]
