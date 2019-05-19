from django.urls import path
from . import views

urlpatterns = [
    path('upload', views.PhotoUpload.as_view(), name='photo-upload')
]