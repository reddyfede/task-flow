from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core.serializers import serialize
from datetime import *
import json
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import AppUser, Task, Team, Availability
from .serializers import UserSerializer


def home(request):
    return render(request, "home.html")


@api_view(["POST"])
def login(request):
    user = get_object_or_404(User, username=request.data["username"])
    if not user.check_password(request.data["password"]):
        return Response(
            {
                "error": "Username or Password invalid.",
                "status": status.HTTP_404_NOT_FOUND,
            }
        )
    token, created = Token.objects.get_or_create(user=user)
    app_user = AppUser.objects.get(user=user)
    serializer = UserSerializer(user)
    return Response(
        {
            "token": token.key,
            "user": serializer.data["username"],
            "role": app_user.role,
            "id": user.id,
        }
    )


@api_view(["GET"])
def user_detail(request, user_id):
    user = User.objects.get(id=user_id)
    team = user.appuser.team
    # add user info to data
    data = {
        "username": user.username,
        "appuserId": user.appuser.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
    }
    # add team info to data, only teamName if team is null
    if team:
        data["teamId"] = team.id
        data["teamName"] = team.name
    else:
        data["teamName"] = team
    # if user is an employee retrieve his own tasks
    if user.appuser.role == "E":
        tasklist = user.appuser.task_set.all().values()
        availability = user.appuser.availability_set.all().order_by("day").values()
        return Response({"user": data, "tasks": tasklist, "availability": availability})
    # if the user is a manager retrieve different data
    if user.appuser.role == "M":
        if team:
            # retrieve all users that are not managers and part of the team
            in_team = team.appuser_set.all().exclude(role__in=["M"])
            # for each team member retrieve their info
            team_list = [
                {
                    "appuserId": user.id,
                    "userId": user.user.id,
                    "first_name": user.user.first_name,
                    "last_name": user.user.last_name,
                    "availability": [
                        a for a in user.availability_set.all().order_by("day").values()
                    ],
                }
                for user in in_team
            ]
            # retrieve all users that are not managers and that are not part of any team
            not_in_team = AppUser.objects.exclude(role__in=["M"]).exclude(
                team__isnull=False
            )
            # for each user not in the team retrieve their info
            not_team_list = [
                {
                    "appuserId": user.id,
                    "userId": user.user.id,
                    "first_name": user.user.first_name,
                    "last_name": user.user.last_name,
                }
                for user in not_in_team
            ]
            # return data, team members and user that are not part of any team
            return Response(
                {"user": data, "teamList": team_list, "notTeamList": not_team_list}
            )
        else:
            return Response({"user": data})


@api_view(["POST"])
def team_create(request):
    team_name = request.data["team"]
    appuser_id = request.data["user"]
    team = Team.objects.create(name=team_name)
    user = AppUser.objects.get(id=appuser_id)
    user.team = team
    user.save()
    return Response({"teamName": team.name, "teamId": team.id})


@api_view(["PUT"])
def team_update(request, team_id):
    team = Team.objects.get(id=team_id)
    team.name = request.data
    team.save()
    return Response({"teamName": team.name, "teamId": team.id})


@api_view(["DELETE"])
def team_delete(request, team_id):
    Team.objects.filter(id=team_id).delete()
    return Response({"message": "Team deleted"})


@api_view(["PUT"])
def team_add_user(request, team_id, user_id):
    team = Team.objects.get(id=team_id)
    user = AppUser.objects.get(id=user_id)
    user.team = team
    user.save()
    return Response(
        {
            "userId": user.user.id,
            "appuserId": user.id,
            "first_name": user.user.first_name,
            "last_name": user.user.last_name,
            "availability": [],
        }
    )


@api_view(["PUT"])
def team_remove_user(request, team_id, user_id):
    user = AppUser.objects.get(id=user_id)
    num_tasks = user.task_set.all().count()
    # if the user has tasks assigned cannot be removed from team
    if num_tasks:
        return Response({"tasksNum": num_tasks})
    # else set his team to null, clear availabilities
    else:
        user.team = None
        user.availability_set.all().delete()
        user.save()
        return Response(
            {
                "appuserId": user.id,
                "first_name": user.user.first_name,
                "last_name": user.user.last_name,
            }
        )


@api_view(["POST"])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data["username"])
        user.first_name = request.data["first_name"]
        user.last_name = request.data["last_name"]
        user.set_password(request.data["password"])
        user.save()
        Token.objects.create(user=user)
        role = request.data["role"]
        AppUser.objects.create(user=user, role=role)
        return Response({"user": user.username})
    else:
        return Response(
            {
                "user": request.data["username"],
                "error": serializer.errors,
                "status": status.HTTP_400_BAD_REQUEST,
            }
        )


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("Token success")


@api_view(["GET"])
def tasks_index(request):
    task = Task.objects.all().values()
    return Response(task)


@api_view(["GET"])
def team_task_detail(request, team_id):
    team = Team.objects.get(id=team_id)
    tasklist = team.task_set.all().exclude(user__isnull=False).values()
    return Response(tasklist)


@api_view(["GET"])
def task_detail(request, task_id):
    task = Task.objects.values().get(id=task_id)
    print(task)
    return Response(task)


@api_view(["POST"])
def task_create(request):
    task_json = request.data
    team = Team.objects.get(id=task_json["team"])
    task_json["team"] = team
    task = Task.objects.create(**task_json)
    return Response("Task created", status=status.HTTP_201_CREATED)


@api_view(["PUT"])
def task_update(request, task_id):
    task_json = request.data
    Task.objects.filter(id=task_id).update(**task_json)
    return Response("Task updated", status=status.HTTP_204_NO_CONTENT)


@api_view(["DELETE"])
def task_destroy(request, task_id):
    Task.objects.filter(id=task_id).delete()
    return Response("Task deleted", status=status.HTTP_204_NO_CONTENT)


@api_view(["PUT"])
def task_add_user(request, task_id, user_id):
    user = AppUser.objects.get(id=user_id)
    Task.objects.filter(id=task_id).update(user=user)
    return Response("Task assigned user", status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def availability_create(request):
    created = Availability.objects.create(**request.data)
    new_av = Availability.objects.get(id=created.id)
    first_start = datetime.strptime(str(new_av.first_part_shift_begin), "%H:%M:%S")
    first_end = datetime.strptime(str(new_av.first_part_shift_end), "%H:%M:%S")
    first_diff = (first_end - first_start).total_seconds() / 60
    new_av.total_first_part = first_diff
    if new_av.second_part_shift_begin:
        second_start = datetime.strptime(
            str(new_av.second_part_shift_begin), "%H:%M:%S"
        )
        second_end = datetime.strptime(str(new_av.second_part_shift_end), "%H:%M:%S")
        second_diff = (second_end - second_start).total_seconds() / 60
        new_av.total_second_part = second_diff
    new_av.save()
    return Response({"id": new_av.id})


@api_view(["DELETE"])
def availability_delete(request, availability_id):
    Availability.objects.get(id=availability_id).delete()
    return Response({"id": availability_id})
