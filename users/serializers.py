from rest_framework.serializers import (
    Serializer, ModelSerializer, CharField, EmailField, ImageField, ValidationError
)
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.models import Q
from .models import Profile
from rest_framework.parsers import JSONParser

# User & Profile Serializers
class ProfileSerializer(ModelSerializer):
    image = ImageField(allow_null=True,required=False, validators=['Check image'])
    class Meta:
        model = Profile
        fields = ('privacy', 'image')

class UserCreateSerializer(ModelSerializer):
    profile = ProfileSerializer(required=False)
    first_name = CharField()
    last_name = CharField()
    email = EmailField()
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'profile')
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # create user
        user = User(
            username = validated_data['username'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            email = validated_data['email'],
            password = validated_data['password']
        )
        user.set_password(validated_data['password'])
        user.save()
        # create profile
        profile_data = validated_data.get('profile', {'privacy': 'public'})
        profile = Profile.objects.create(
            user_id = user.id,
            privacy = profile_data['privacy']
        )
        return user

class UserLoginSerializer(Serializer):
    username = CharField()
    password = CharField()
    class Meta:
        model = User
        
        fields = ('username', 'password')        
    
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise ValidationError("Incorrect credentials. Please try again.")

        # user_obj = None
        # if not email and not username:
        #     raise ValidationError("A username or email is required to login.")
        
        # user = User.objects.filter(
        #     Q(email=email) |
        #     Q(username=username)
        # )
        # if user.exists():
        #     user_obj = user.first()
        # else:
        #     raise ValidationError('This username/email is not valid.')
        # if user_obj:
        #     if not user_obj.check_password(password):
        #         raise ValidationError('Incorrect credentials. Please try again.')
        # return user_obj

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')