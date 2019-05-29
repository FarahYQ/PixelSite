from django.urls import path
from . import views

urlpatterns = [
    path('upload', views.PhotoUploadSet.as_view({"post": "create"}), name='photo-upload'),
    path('photos', views.PhotoViewSet.as_view({'get': 'list'}))
]