# Generated by Django 3.2.6 on 2022-06-29 17:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0005_rename_is_replay_sensor_is_relay'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sensor',
            old_name='is_relay',
            new_name='is_monitor',
        ),
    ]
