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

    def create(self, validated_date):
        # create user
        user = User.objects.create(
            username = validated_date['username'],
            first_name = validated_date['first_name'],
            last_name = validated_date['last_name'],
            email = validated_date['email']
        )

        # create profile
        profile_data = validated_date.pop('profile')
        profile = Profile.objects.create(
            privacy = profile_data['privacy'],
            image = profile_data['image']
        )

        return user
        