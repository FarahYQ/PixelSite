from django.urls import path
from . import views

urlpatterns = [
    # path('', views.profile, name='user-profile'),
    path('register', views.UserCreate.as_view(), name='user-register'),
    path('login', views.UserLogin.as_view(), name='user-login'),
    path('auth/user', views.UserAPI.as_view())
]