from django.shortcuts import render
from django.http import HttpResponse
from decimal import Decimal
from django.core import serializers
import csv
import os
from .models import Neighborhoods, Listing

# Create your views here.

def index(request):
    # import_data()
    listings = Listing.objects.all()
    data1 = listings[:1]
    data = serializers.serialize("json", listings)
    return render(request, 'main.html', {'listing': data})

def import_data():
    my_path = os.path.abspath(os.path.dirname(__file__))
    path = os.path.join(my_path, "csvs/listings.csv")
    print (path)
    dataReader = csv.reader(open(path), delimiter=',', quotechar='"')
    for row in dataReader:
        model = Listing()
        model.listingId = int(row[0])
        model.location = row[41]
        model.long = row[49]
        model.lat = row[48]
        model.neighborhood = row[39]
        model.total_places_in_neighborhood = numPlaces(row[39])
        model.property_type = row[51]
        model.room_type = row[52]
        model.accommodates = row[53]
        model.bed_type = row[57]
        pNight = str(row[60])[1:].replace(',', '')
        model.price_night = pNight
        pClean = str(row[64])[1:].replace(',', '')
        if (pClean == ''):
            pClean = '0.00'
        model.price_cleaning = pClean

        model.host_response_time = row[25]
        model.host_response_rate = str(row[26]).replace('%', '')
        model.host_is_superhost = row[28] in ['t']
        model.host_has_profile_pic = row[35] in ['t']
        model.host_identity_verified = row[36] in ['t']
        dateStr = row[22]
        if (dateStr == ''):
            dateStr = '1900-12-01'
        model.host_since = dateStr

        score1 = row[79]
        if (score1 == ''):
            score1 = 0
        model.score_overall = score1
        score2 = row[84]
        if (score2 == ''):
            score2 = 0
        model.score_location = score2
        model.save()

def numPlaces(neighborhood):
    if (neighborhood=='Bayview'): return 118
    if (neighborhood=='Bernal Heights'): return 451
    if (neighborhood=='Castro/Upper Market'): return 480
    if (neighborhood=='Chinatown'): return 152
    if (neighborhood=='Crocker Amazon'): return 28
    if (neighborhood=='Diamond Heights'): return 22
    if (neighborhood=='Downtown/Civic Center'): return 564
    if (neighborhood=='Excelsior'): return 153
    if (neighborhood=='Financial District'): return 140
    if (neighborhood=='Glen Park'): return 82
    if (neighborhood=='Golden Gate Park'): return 8
    if (neighborhood=='Haight Ashbury'): return 414
    if (neighborhood=='Inner Richmond'): return 287
    if (neighborhood=='Inner Sunset'): return 170
    if (neighborhood=='Lakeshore'): return 52
    if (neighborhood=='Marina'): return 306
    if (neighborhood=='Mission'): return 1036
    if (neighborhood=='Nob Hill'): return 322
    if (neighborhood=='Noe Valley'): return 390
    if (neighborhood=='North Beach'): return 180
    if (neighborhood=='Ocean View'): return 111
    if (neighborhood=='Outer Mission'): return 164
    if (neighborhood=='Outer Richmond'): return 195
    if (neighborhood=='Outer Sunset'): return 254
    if (neighborhood=='Pacific Heights'): return 243
    if (neighborhood=='Parkside'): return 121
    if (neighborhood=='Potrero Hill'): return 286
    if (neighborhood=='Presidio'): return 6
    if (neighborhood=='Presidio Heights'): return 39
    if (neighborhood=='Russian Hill'): return 224
    if (neighborhood=='Seacliff'): return 24
    if (neighborhood=='South of Market'): return 618
    if (neighborhood=='Treasure Island/YBI'): return 25
    if (neighborhood=='Twin Peaks'): return 101
    if (neighborhood=='Visitacion Valley'): return 38
    if (neighborhood=='West of Twin Peaks'): return 123
    if (neighborhood=='Western Addition'): return 779
    if (neighborhood==''): return 1
    return 1


# def import_data():
#     my_path = os.path.abspath(os.path.dirname(__file__))
#     path = os.path.join(my_path, "csvs/neighbourhoods.csv")
#     print (path)
#     dataReader = csv.reader(open(path), delimiter=',', quotechar='"')
#     for row in dataReader:
#         model = Neighborhoods()
#         model.name = row[0]
#         model.save()
