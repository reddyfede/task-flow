from django.contrib import admin
from django.urls import include, path, re_path
from main_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main_app.urls')),
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('test_token', views.test_token)
]
