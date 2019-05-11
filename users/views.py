from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework.views import APIView

class UserCreate(APIView):
    def post(self, request, format='json'):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.create(validated_date=request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)

