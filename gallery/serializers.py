from rest_framework.serializers import ModelSerializer
from .fields import PointField
from .models import Photo

class KeyedListSerializerSerializer(ModelSerializer):
    def to_representation(self, data):
        response = super().to_representation(data)
        # key = response.pop('id')
        return {response}

class PhotoUploadSerializer(ModelSerializer):
    geo_location = PointField(required=False)
    class Meta:
        model = Photo
        fields = '__all__'
        read_only_fields = ('user', 'geo_location')

class PhotoSerializer(ModelSerializer):
    geo_location = PointField()
    class Meta:
        model = Photo
        fields = '__all__'

class FilteredPhotoSerializer(ModelSerializer):
    class Meta: 
        model = Photo
        fields = ('id',)
   


