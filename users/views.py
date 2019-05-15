from django.shortcuts import render
from .serializers import UserCreateSerializer, UserLoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.permissions import AllowAny

class UserCreate(APIView):
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]
    def post(self, request, format='json'):
        serializer = UserCreateSerializer(data = request.data)
        if serializer.is_valid():
            serializer.create(validated_data=request.data)
            return Response(serializer.data)
        return Response(serializer.error_messages)


class UserLogin(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data = request.data)
        if serializer.is_valid():
            new_data = serializer.data
            return Response(new_data, status=HTTP_200_OK)
        return Response(serializer.error_messages, status=HTTP_400_BAD_REQUEST)

