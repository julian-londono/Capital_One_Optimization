# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-08 06:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20171108_0653'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='lat',
            field=models.DecimalField(decimal_places=15, max_digits=19),
        ),
        migrations.AlterField(
            model_name='listing',
            name='long',
            field=models.DecimalField(decimal_places=15, max_digits=19),
        ),
    ]
