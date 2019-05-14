from django.urls import path, include
from . import views

urlpatterns = [
    # path('', views.profile, name='user-profile'),
    path('register', views.UserCreate.as_view(), name='user-register'),
    path('login', views.UserLogin.as_view(), name='user-login')
]