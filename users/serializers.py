from rest_framework.serializers import (
    ModelSerializer, CharField, EmailField, ValidationError
)
from django.contrib.auth.models import User
from django.db.models import Q
from .models import Profile

# User & Profile Serializer
class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ('privacy', 'image')

class UserCreateSerializer(ModelSerializer):
    profile = ProfileSerializer(required=True)

    # email2 = EmailField(label="Confirm Email")
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'profile')
        extra_kwargs = {"password": {"write_only": True}}

    # def validate_email2(self, value):
    #     data = self.get_initial()
    #     email1 = data.get('email')
    #     email2 = value
    #     if email1 != email2: 
    #         raise ValidationError("Emails must match")

    #     user_qs = User.objects.filter(email=email2)
    #     if user_qs.exists():
    #         raise ValidationError("This user as already registered.")

    #     return value

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

class UserLoginSerializer(ModelSerializer):
    username = CharField(required=False, allow_blank=True)
    email = EmailField(required=False, allow_blank=True)
    token = CharField(allow_blank=True, read_only=True)
    class Meta:
        model = User
        
        fields = ('username', 'email', 'password', 'token')        

    def validate(self, data):
        email = data.get('email', None)
        username = data.get('username', None)
        password = data['password']
        user_obj = None
        if not email and not username:
            raise ValidationError("A username or email is required to login.")
        
        user = User.objects.filter(
            Q(email=email) |
            Q(username=username)
        )

        if user.exists() and user.count == 1:
            user_obj = user.first()
        else:
            raise ValidationError('This username/email is not valid.')

        if user_obj:
            if not user_obj.check_password(password):
                raise ValidationError('Incorrect credentials. Please try again.')
        data['token'] = 'Some random token'