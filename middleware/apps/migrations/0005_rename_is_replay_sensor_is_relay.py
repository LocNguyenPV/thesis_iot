# Generated by Django 3.2.6 on 2022-06-29 17:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0004_sensor_is_replay'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sensor',
            old_name='is_replay',
            new_name='is_relay',
        ),
    ]
