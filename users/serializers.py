from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

# User & Profile Serializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('privacy', 'image')

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'profile')