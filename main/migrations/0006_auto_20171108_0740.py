# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-08 07:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_auto_20171108_0714'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='host_response_rate',
            field=models.CharField(default='N/A', max_length=30),
        ),
    ]
