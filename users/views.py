from django.shortcuts import render
from .serializers import UserCreateSerializer, UserLoginSerializer, UserSerializer
git from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework import viewsets, permissions, generics

class UserCreate(generics.GenericAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]
    def post(self, request, format='json'):
        serializer = UserCreateSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.create(validated_data=request.data)
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1]
            })
        return Response(serializer.error_messages)


class UserLogin(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1]
            })
        return Response(serializer.error_messages, status=HTTP_400_BAD_REQUEST)

