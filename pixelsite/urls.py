"""pixelsite URL Configuration
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers
from gallery import views as gallery_views
from users import views as user_views

# Create router for rest_framework viewsets
router = routers.DefaultRouter()
router.register('gallery-view', gallery_views.PhotoReadOnlySet, base_name='gallery-view')
router.register('photos', gallery_views.PhotoViewSet, base_name='photos')
router.register('selected-photos', gallery_views.FilteredPhotoReadOnlySet, base_name='selected-photos')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('rest_framework.urls')),
    path('', TemplateView.as_view(template_name='frontend/index.html')),
    path('auth/', include('knox.urls')),
    path('api/', include(router.urls)),
    path('api/user/', include('users.urls'))
]

