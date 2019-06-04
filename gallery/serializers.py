from rest_framework.serializers import ModelSerializer
from .models import Photo

class KeyedListSerializerSerializer(ModelSerializer):
    def to_representation(self, data):
        response = super().to_representation(data)
        print(response)
        # key = response.pop('id')
        return {response}

class PhotoUploadSerializer(ModelSerializer):
    class Meta:
        model = Photo
        fields = ('caption', 'image', 'description', 'location', 'lat', 'lng', 'id')

class PhotoSerializer(ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'


        