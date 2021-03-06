from django.db import models
from django.contrib.auth.models import User
import django.contrib.gis.db.models as gis_models

def upload_to(instance, filename):
    return 'images/%s/%s' % (instance.user.id, filename)

class Photo(models.Model):
    user = models.ForeignKey(User, related_name="photos", on_delete=models.CASCADE)
    caption = models.CharField(max_length=40)
    image = models.ImageField(upload_to=upload_to)
    description = models.TextField()
    lat = models.DecimalField(max_digits=8, decimal_places=6, blank=True, null=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    location = models.CharField(max_length=255)
    geo_location = gis_models.PointField(null=True, blank=True)


