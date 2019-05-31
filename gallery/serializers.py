from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Photo
from django.contrib.auth.models import User

class PhotoUploadSerializer(ModelSerializer):
    class Meta:
        model = Photo
        fields = ('caption', 'image', 'description', 'location', 'lat', 'lng')

class KeyedListSerializerSerializer(ModelSerializer):
    def to_representation(self, data):
        response = super().to_representation(data)
        key = response.pop('id')
        return {key: response}

class PhotoSerializer(ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'

# class UserPhotoSerializer(KeyedListSerializerSerializer):
#     photos = PrimaryKeyRelatedField(many=True, read_only=True)
#     class Meta:
#         model = User
#         fields = ('id', 'photos',)
        