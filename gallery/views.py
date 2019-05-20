from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework import viewsets, permissions
from .serializers import PhotoUploadSerializer, PhotoSerializer

class PhotoUpload(APIView):
    serializer_class = PhotoUploadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format='json'):
        serializer = PhotoSerializer(data = request.data)
        if serializer.is_valid():
            validated_data = request.data
            validated_data['user'] = request.user
            serializer.create(validated_data=validated_data)
            return Response(serializer.data)
        return Response(serializer.error_messages, status=HTTP_400_BAD_REQUEST)

class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotoSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return self.request.user.photos.all()