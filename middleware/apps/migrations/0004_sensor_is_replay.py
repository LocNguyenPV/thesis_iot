# Generated by Django 3.2.6 on 2022-06-28 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0003_auto_20220626_2254'),
    ]

    operations = [
        migrations.AddField(
            model_name='sensor',
            name='is_replay',
            field=models.BooleanField(default=False),
        ),
    ]
