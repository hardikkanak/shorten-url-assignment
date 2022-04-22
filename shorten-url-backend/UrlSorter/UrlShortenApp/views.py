import time

from django.shortcuts import render
from django.http import JsonResponse
import random
import string

from rest_framework.decorators import api_view

from .models import *
from .serializers import *


# Create your views here.

def index(request):
    return JsonResponse({'message': 'Welcome'})


@api_view(['GET'])
def getAllGeneratedURL(request):
    try:
        time.sleep(2)
        data = GeneratedURL.objects.values().order_by('-id')
        return JsonResponse({'message': 'Record fetch successfully', 'data': list(data)})
    except Exception as e:
        return JsonResponse({'message': 'Data Not found'})


@api_view(['GET'])
def getLongURLFromGenerated(request, shortener_link):
    try:
        # Get Original URL from shortener_link
        data = GeneratedURL.objects.get(shortener_link=shortener_link)
        mGeneratedURLSerializer = GeneratedURLSerializer(data)
        return JsonResponse({'status':1,'message': 'Record fetch successfully', 'data': mGeneratedURLSerializer.data})
    except GeneratedURL.DoesNotExist:
        return JsonResponse({'status':0,'message': 'URL Not found'})


@api_view(['POST'])
def generatNewURL(request):
    try:
        data = dict(request.data)

        # Already URL Genrated or Not
        is_data_exist = GeneratedURL.objects.filter(original_url=data['original_url']).exists()
        if is_data_exist:
            return JsonResponse({'message': 'URL already generated'})

        # New shortener_link Generated and Save into Database
        data['shortener_link'] = ''.join(random.choice(string.ascii_letters)
                                         for x in range(10))
        serializer = GeneratedURLSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return JsonResponse({'message': 'New URL is created!!!'})
    except Exception as e:
        return JsonResponse({'message': 'Something went wrong please try again'})
