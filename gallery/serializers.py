from rest_framework.serializers import (
    ModelSerializer, CharField, EmailField, ValidationError, RelatedField, SerializerMethodField, DecimalField
)
from django.contrib.auth.models import User
from .models import Photo
from .photo_metadata_extractor import extract_geodata, get_lat_lng


class PhotoUploadSerializer(ModelSerializer):
    # lat = DecimalField(allow_null=True, required=False, max_digits=8, decimal_places=6)
    # lng = DecimalField(allow_null=True, required=False, max_digits=9, decimal_places=6)

    class Meta:
        model = Photo
        fields = ('caption', 'image', 'description', 'location')
    
    def create(self, validated_data):
        Photo.objects.create(
            user_id = validated_data['user'].id,
            caption = validated_data['caption'],
            image = validated_data['image'],
            description = validated_data['description'],
            lat = lat,
            lng = lng,
            location = validated_data['location']
        )

class PhotoSerializer(ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'