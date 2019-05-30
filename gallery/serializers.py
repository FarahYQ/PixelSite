from rest_framework.serializers import (
    ModelSerializer, CharField, EmailField, ValidationError, RelatedField, SerializerMethodField, DecimalField
)
from django.contrib.auth.models import User
from .models import Photo
from .photo_metadata_extractor import extract_geodata, get_lat_lng


class PhotoUploadSerializer(ModelSerializer):
    class Meta:
        model = Photo
        fields = ('caption', 'image', 'description', 'location', 'lat', 'lng')

class PhotoSerializer(ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'