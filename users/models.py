from django.db import models
from django.contrib.auth.models import User
from PIL import Image

class Profile(models.Model):
    user = models.OneToOneField(User, unique=True, on_delete=models.CASCADE)
    PRIVACY_CHOICES = (
        ('public', 'Public'),
        ('private', 'Private')
    )
    privacy = models.CharField(max_length=7, choices=PRIVACY_CHOICES, default='public')
    image = models.ImageField(default='default.jpg', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username} Profile'
