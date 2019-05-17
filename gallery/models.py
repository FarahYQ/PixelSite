from django.db import models
from django.contrib.auth.models import User

def upload_to(instance, filename):
    return 'images/%s/%s' % (instance.user.id, filename)

class Photo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    caption = models.CharField(max_length=40)
    image = models.ImageField(upload_to=upload_to)
    description = models.TextField()
    lat = models.DecimalField(max_digits=8, decimal_places=6)
    lng = models.DecimalField(max_digits=9, decimal_places=6)
    location = models.CharField(max_length=255)