from django.db import models
from django.utils import timezone
from datetime import datetime, timedelta

# Create your models here.

class Neighborhoods(models.Model):
    name = models.CharField(max_length=255, default='area')
    num = models.IntegerField(default=0)

class Listing(models.Model):
    listingId = models.IntegerField(default=0)
    location = models.CharField(max_length=255, default='SF')
    neighborhood = models.CharField(max_length=255, default='N/A')
    total_places_in_neighborhood = models.IntegerField(default=1)
    long = models.DecimalField(max_digits=19, decimal_places=15, default=0.0)
    lat = models.DecimalField(max_digits=19, decimal_places=15, default=0.0)
    property_type = models.CharField(max_length=30, default='N/A')
    room_type = models.CharField(max_length=30, default='N/A')
    accommodates = models.IntegerField(default=0)
    bed_type = models.CharField(max_length=30, default='N/A')
    price_night = models.DecimalField(max_digits=8, decimal_places=3, default=0.0)
    price_cleaning = models.DecimalField(max_digits=8, decimal_places=3, default=0.0)

    host_response_time = models.CharField(max_length=30, default='N/A')
    host_response_rate = models.CharField(max_length=30, default='N/A')
    host_is_superhost = models.BooleanField(default=False)
    host_has_profile_pic = models.BooleanField(default=False)
    host_identity_verified = models.BooleanField(default=False)
    host_since = models.DateField(default="1998-01-02")

    score_overall = models.IntegerField(default=0)
    score_location = models.IntegerField(default=0)
