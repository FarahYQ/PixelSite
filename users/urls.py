from django.urls import path
from . import views
from knox import views as knox_views

urlpatterns = [
    path('register/', views.UserCreate.as_view(), name='user-register'),
    path('login/', views.UserLogin.as_view(), name='user-login'),
    path('auth/user/', views.UserAPI.as_view()),
    path('logout/', views.LogoutView.as_view(), name='knox-logout')
]