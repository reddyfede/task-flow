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

DAYS = (
    (0, "Monday"),
    (1, "Tuesday"),
    (2, "Wednesday"),
    (3, "Thursday"),
    (4, "Friday"),
    (5, "Saturday"),
    (6, "Sunday"),
)


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
            in_team = team.appuser_set.exclude(role__in=["M"])
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
    Task.objects.create(**task_json)
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
    task = Task.objects.get(id=task_id)
    user = AppUser.objects.get(id=user_id)
    req_date = datetime.strptime(request.data, "%Y-%m-%d").date()
    day_of_week = req_date.weekday()
    user_av = user.availability_set.filter(day=day_of_week).values()
    message = ""
    # if user has availability on the day -> calculate total availability
    if user_av:
        user_av_tot = user_av[0]["total_first_part"]
        if user_av[0]["total_second_part"]:
            user_av_tot += user_av[0]["total_second_part"]
        # if enough availability -> check if user has tasks on the same day
        if user_av_tot >= task.planned_duration:
            all_user_tasks = user.task_set.all().order_by("planned_end").values()
            user_tasks = [
                t for t in all_user_tasks if t["planned_start"].date() == req_date
            ]
            print(user_tasks)
            if user_tasks:
                user_tasks_duration = 0
                durations = [t["planned_duration"] for t in user_tasks]
                user_tasks_duration = sum(durations)
                remaining_av = user_av_tot - user_tasks_duration
                # if user has enough remaining availability set start time of the new task
                # as the end time of the last task already assigned on that day
                if remaining_av >= task.planned_duration:
                    message = "ready to assign after other tasks"
                    last_task_end_datetime = user_tasks[-1]["planned_end"]
                    print(last_task_end_datetime)
                    start_date_time = last_task_end_datetime
                    print(start_date_time)
                    # check if previous tasks end after lunch or previous tasks + new task end before lunch
                    # if yes -> set end time as start + duration
                    if (
                        user_tasks_duration > user_av[0]["total_first_part"]
                        or user_tasks_duration + task.planned_duration
                        < user_av[0]["total_first_part"]
                    ):
                        end_date_time = start_date_time + timedelta(
                            minutes=task.planned_duration
                        )
                    # if no -> set end time of task as the time after lunch + difference between the duration of all the tasks
                    # and the duration of the pre-lunch shift
                    else:
                        shift_datetime = datetime.combine(
                            req_date, user_av[0]["second_part_shift_begin"]
                        )
                        end_date_time = shift_datetime + timedelta(
                            minutes=(
                                user_tasks_duration
                                + task.planned_duration
                                - user_av[0]["total_first_part"]
                            )
                        )
                    # update the task with the calculated times
                    Task.objects.filter(id=task_id).update(
                        user=user,
                        planned_start=start_date_time,
                        planned_end=end_date_time,
                    )
                    return Response({"taskId": task_id})
                # display a message that user has not enough remining availability
                else:
                    message = f"{user.user.first_name} {user.user.last_name} has not enough residual availability  for {DAYS[day_of_week][1]}: remaining {remaining_av} minutes."
            # set the start time of the new task as the start time of user availability
            # check if task end before lunch
            else:
                message = "ready to assign at the start of day"
                start_time = user_av[0]["first_part_shift_begin"]
                start_date_time = datetime.combine(req_date, start_time)
                # if yes -> set end time of task as start + duration
                if task.planned_duration <= user_av[0]["total_first_part"]:
                    end_date_time = start_date_time + timedelta(
                        minutes=task.planned_duration
                    )
                # if no -> set end time of task as the time after lunch + difference between the duration of the task
                # and the duration of the pre-lunch shift
                else:
                    shift_datetime = datetime.combine(
                        req_date, user_av[0]["second_part_shift_begin"]
                    )
                    end_date_time = shift_datetime + timedelta(
                        minutes=(task.planned_duration - user_av[0]["total_first_part"])
                    )
                # update the task with the calculated times
                Task.objects.filter(id=task_id).update(
                    user=user,
                    planned_start=start_date_time,
                    planned_end=end_date_time,
                )
                return Response({"taskId": task_id})
        # display a message that user has not enough remining availability set for the day
        else:
            message = f"{user.user.first_name} {user.user.last_name} has not enough availability set for {DAYS[day_of_week][1]}: tot {user_av_tot} minutes."
    # display a message that user has no availability
    else:
        message = f"{user.user.first_name} {user.user.last_name} has no availability set for {DAYS[day_of_week][1]}."
    print(message)
    return Response({"message": message})


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
