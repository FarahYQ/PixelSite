from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.permissions import AllowAny
from .serializers import PhotoSerializer

class PhotoUpload(APIView):
    serializer_class = PhotoSerializer
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        print("==============")
        print(request.data)
        serializer = PhotoSerializer(data = request.data)
        print('-====---=====')
        if serializer.is_valid():
            validated_data = request.data
            validated_data['user'] = request.user
            print("------------")
            print(validated_data)
            serializer.create(validated_data=validated_data)
            return Response(serializer.data)
        return Response(serializer.error_messages, status=HTTP_400_BAD_REQUEST)
