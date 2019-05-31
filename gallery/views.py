from django.shortcuts import render
from knox.models import AuthToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework import viewsets, permissions
from .serializers import PhotoUploadSerializer, PhotoSerializer
from .photo_metadata_extractor import extract_geodata, get_lat_lng
from django.contrib.auth.models import User
from .models import Photo


class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotoUploadSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Photo.objects.all()

    def perform_create(self, serializer):
        data = self.request.data
        lat, lng = None, None
        if 'image' in data:
            exif_data = extract_geodata(data['image'])
            lat, lng = get_lat_lng(exif_data)
            lat = "%.6f" % lat
            lng = "%.6f" % lng
        user = self.request.user
        serializer.save(lat=lat, lng=lng, user=user)

class PhotoReadOnlySet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PhotoSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        photos = Photo.objects.filter(user_id=self.request.user)
        photos_dict = { photo.id : photo for photo in photos }
        print(photos_dict)
        return photos

    def list(self, request, *args, **kwargs):
        response = super(PhotoReadOnlySet, self).list(request, *args, **kwargs) # call the original 'list'
        user = response.data[0]["user"]
        response.data = { user : { photo["id"] : photo for photo in response.data }} # customize the response data
        return response # return response with this custom representation
