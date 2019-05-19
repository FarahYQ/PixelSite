from rest_framework.serializers import (
    ModelSerializer, CharField, EmailField, ValidationError, RelatedField, SerializerMethodField
)
from django.contrib.auth.models import User
from .models import Photo
from .photo_metadata_extractor import extract_geodata, get_lat_lng


class PhotoSerializer(ModelSerializer):

    class Meta:
        model = Photo
        fields = ('caption', 'image', 'description', 'location')
    
    def create(self, validated_data):
        exif_data = extract_geodata(validated_data['image'])
        lat, lng = get_lat_lng(exif_data)
        Photo.objects.create(
            user_id = validated_data['user'].id,
            caption = validated_data['caption'],
            image = validated_data['image'],
            description = validated_data['description'],
            lat = lat,
            lng = lng,
            location = validated_data['location']
        )
