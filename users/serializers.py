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

    def create(self, validated_data):
        # create user
        user = User.objects.create(
            username = validated_data['username'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            email = validated_data['email']
        )

        # create profile
        profile_data = validated_data.pop('profile')
        profile = Profile.objects.create(
            user_id = user.id,
            privacy = profile_data['privacy']
        )

        return user
        

