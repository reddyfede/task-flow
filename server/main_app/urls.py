from django.urls import path
from main_app import views
from . import views

urlpatterns = [
    path('login/', views.login),
    path('signup/', views.signup),
    path('test_token/', views.test_token),
    path('', views.home, name='home'),
]
