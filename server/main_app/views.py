from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core.serializers import serialize
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
from .models import AppUser, Task, Team
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
        "firstName": user.first_name,
        "lastName": user.last_name,
    }
    # add team info to data, only teamName if team is null
    if team:
        data["teamId"] = team.id
        data["teamName"] = team.name
    else:
        data["teamName"] = team
    # if user is an employee retrieve his own tasks
    if user.appuser.role == "E":
        tasks = user.appuser.task_set.all()
        tasklist = [
            {
                "name": t.name,
                "dueDate": t.due_date,
                "plannedDuration": t.planned_duration,
                "plannedStart": t.planned_start,
                "plannedEnd": t.planned_end,
                "actualDuration": t.actual_duration,
                "actualStart": t.actual_start,
                "actualEnd": t.actual_end,
            }
            for t in tasks
        ]
        return Response({"user": data, "tasks": tasklist})
    # if the user is a manager retrieve different data
    if user.appuser.role == "M":
        if team:
            # retrieve all users that are not managers and part of the team
            in_team = team.appuser_set.all().exclude(role__in=["M"])
            # for each team member retrieve their info and their availability
            team_list = [
                {
                    "appuserId": user.id,
                    "firstName": user.user.first_name,
                    "lastName": user.user.last_name,
                    "availability": [
                        {
                            "day": a.day,
                            "firstBegin": a.first_part_shift_begin,
                            "firstEnd": a.first_part_shift_end,
                            "secondBegin": a.second_part_shift_begin,
                            "secondEnd": a.second_part_shift_end,
                        }
                        for a in user.availability_set.all()
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
                    "firstName": user.user.first_name,
                    "lastName": user.user.last_name,
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
    print(request.data)
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
    print(team_id, user_id)
    team = Team.objects.get(id=team_id)
    user = AppUser.objects.get(id=user_id)
    user.team = team
    user.save()
    return Response(
        {
            "appuserId": user.id,
            "firstName": user.user.first_name,
            "lastName": user.user.last_name,
            "availability": [],
        }
    )


@api_view(["PUT"])
def team_remove_user(request, team_id, user_id):
    pass


@api_view(["POST"])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data["username"])
        user.first_name = request.data["firstName"]
        user.last_name = request.data["lastName"]
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


# @api_view(['GET'])
# def task_(request):
#   user = get_object_or_404(User, username=request.data['username'])
#   if not user.check_password(request.data['password']):
#       return Response("Username or Password invalid.", status=status.HTTP_404_NOT_FOUND)
#   token, created = Token.objects.get_or_create(user=user)
#   app_user = AppUser.objects.get(user = user)

#   serializer = UserSerializer(user)
#   return Response({'token': token.key, 'user': serializer.data['username'], 'role': app_user.role})


@api_view(["GET"])
def tasks_index(request):
    task = Task.objects.all().values()
    return Response(task)


@api_view(["GET"])
def task_detail(request, task_id):
    task = Task.objects.values().get(id=task_id)
    print(task)
    return Response(task)


@api_view(["POST"])
def task_create(request):
    task_json = request.data
    print(task_json["team"])
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
