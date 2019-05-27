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


class PhotoUpload(APIView):
    serializer_class = PhotoUploadSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, format='json'):
        data = request.data
        exif_data = extract_geodata(data['image'])
        lat, lng = get_lat_lng(exif_data)
        data["lat"] = "%.6f" % lat
        data["lng"] = "%.6f" % lng
        data["user"] = request.user.id
        print("serializing", data)
        serializer = PhotoSerializer(data = request.data)
        print(serializer.is_valid(), serializer.errors)
        if serializer.is_valid():
            validated_data = data
            owner = User.objects.get(id=validated_data['user'])
            print("it's valid", validated_data)
            Photo.objects.create(
                user = owner,
                caption = validated_data['caption'],
                image = validated_data['image'],
                description = validated_data['description'],
                lat = validated_data['lat'],
                lng = validated_data['lng'],
                location = validated_data['location']
            )
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotoSerializer
    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        return self.request.user.photos.all()