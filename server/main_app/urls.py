from django.urls import path, re_path
from main_app import views
from . import views

urlpatterns = [
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('test_token', views.test_token),
    path('', views.home, name='home'),
]
