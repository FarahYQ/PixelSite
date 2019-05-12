from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class UserCreate(APIView):
    def post(self, request, format='json'):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.create(validated_data=request.data)
            return Response(serializer.data)
        return Response(serializer.error_messages)

