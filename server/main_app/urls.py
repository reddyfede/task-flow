from django.urls import path
from main_app import views
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("test_token/", views.test_token),
    path("user/login/", views.login),
    path("user/signup/", views.signup),
    path("user/<int:user_id>/", views.user_detail),
    path("team/create/", views.team_create),
    path("team/<int:team_id>/update/", views.team_update),
    path("team/<int:team_id>/delete/", views.team_delete),
    path("team/<int:team_id>/add_user/<int:user_id>/", views.team_add_user),
    path("team/<int:team_id>/remove_user/<int:user_id>/", views.team_remove_user),
    path("tasks/", views.tasks_index, name="task"),
    path("tasks/<int:task_id>/", views.task_detail, name="task_detail"),
    path("tasks/create/", views.task_create, name="task_create"),
    path("tasks/<int:task_id>/update/", views.task_update, name="task_update"),
    path("tasks/<int:task_id>/delete/", views.task_destroy, name="task_delete"),
]
