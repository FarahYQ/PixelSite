from rest_framework.serializers import (
    ModelSerializer, CharField, EmailField, ValidationError, RelatedField, SerializerMethodField
)
from django.contrib.auth.models import User
from .models import Photo


class PhotoSerializer(ModelSerializer):

    class Meta:
        model = Photo
        fields = '__all__'
    
    def create(self, validated_data):
        Photo.objects.create(
            user_id = validated_data['user'].id,
            caption = validated_data['caption'],
            image = validated_data['image'],
            description = validated_data['description'],
            lat = validated_data['lat'],
            lng = validated_data['lng'],
            location = validated_data['location']
        )
