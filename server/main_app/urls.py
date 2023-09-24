from django.urls import path

from . import views

urlpatterns = [
    path("", views.tasks_index, name="index"),
    path("update/", views.tasks_update, name="update"),
]