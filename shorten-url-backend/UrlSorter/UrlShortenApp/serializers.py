from rest_framework import serializers
from .models import *


class GeneratedURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedURL
        fields = "__all__"
