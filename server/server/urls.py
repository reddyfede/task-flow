from django.contrib import admin
from django.urls import include, path, re_path
from main_app import views

urlpatterns = [
    path('', include('main_app.urls')),
    path('admin/', admin.site.urls),
]
