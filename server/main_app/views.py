from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core.serializers import serialize
import json
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import AppUser, Task, Team
from .serializers import UserSerializer 


@api_view(['POST'])
def login(request):
  user = get_object_or_404(User, username=request.data['username'])
  if not user.check_password(request.data['password']):
      return Response({'error': "Username or Password invalid.", 'status' : status.HTTP_404_NOT_FOUND})
  token, created = Token.objects.get_or_create(user=user)
  app_user = AppUser.objects.get(user = user)
  serializer = UserSerializer(user)
  return Response({
    'token': token.key,
    'user': serializer.data['username'],
    'role': app_user.role,
    'id': user.id,
    })

@api_view(['GET'])
def user_detail(request, user_id):
  user = User.objects.get(id = user_id)
  team = user.appuser.team
  data = {
  'username': user.username,
  'firstName': user.first_name,
  'lastName': user.last_name,
  }
  if team:
    data['teamId']= team.id
    data['teamName'] = team.name
  else:
    data['team'] = team
  if user.appuser.role == 'E':
    return Response(data)
  if user.appuser.role == 'M':
      if team:
        in_team = team.appuser_set.all().exclude(role__in = ['M'])
        team_list =[{'appuserId': user.id,
                    'firstName': user.user.first_name,
                    'lastName': user.user.last_name,
                    'availability':[{'day': a.day,
                                      'firstBegin': a.first_part_shift_begin,
                                      'firstEnd': a.first_part_shift_end,
                                      'secondBegin': a.second_part_shift_begin,
                                      'secondEnd': a.second_part_shift_end,
                                      } for a in user.availability_set.all()],
                    } for user in in_team ]
        not_in_team = AppUser.objects.exclude(role__in = ['M']).exclude(team__isnull=False)
        not_team_list =[{'appuserId': user.id,
                        'firstName': user.user.first_name,
                        'lastName': user.user.last_name}
                        for user in not_in_team ]
        return Response({'user': data, 'teamList': team_list, 'notTeamList':not_team_list})
      else:
        return Response(data)
  

@api_view(['POST'])
def signup(request):
  serializer = UserSerializer(data = request.data)
  if serializer.is_valid():
    serializer.save()
    user = User.objects.get(username = request.data['username'])
    user.first_name = request.data['firstName']
    user.last_name = request.data['lastName']
    user.set_password(request.data['password'])
    user.save()
    Token.objects.create(user=user)
    role = request.data['role']
    AppUser.objects.create(user = user, role=role)
    return Response({'user': user.username})
  else:
    return Response({'user': request.data['username'], 'error': serializer.errors, 'status':status.HTTP_400_BAD_REQUEST})



@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
  return Response("Token success")


def home(request):
  return render(request, 'home.html')

# @api_view(['GET'])
# def task_(request):
#   user = get_object_or_404(User, username=request.data['username'])
#   if not user.check_password(request.data['password']):
#       return Response("Username or Password invalid.", status=status.HTTP_404_NOT_FOUND)
#   token, created = Token.objects.get_or_create(user=user)
#   app_user = AppUser.objects.get(user = user)

#   serializer = UserSerializer(user)
#   return Response({'token': token.key, 'user': serializer.data['username'], 'role': app_user.role})

@api_view(['GET'])
def tasks_index(request):
  task = Task.objects.all().values()
  return Response(task)

@api_view(['GET'])
def task_detail(request, task_id):
  task = Task.objects.values().get(id=task_id)
  print(task)
  return Response(task)

@api_view(['POST'])
def task_create(request):
  task_json = request.data
  print(task_json['team'])
  team = Team.objects.get(id=task_json['team'])
  task_json['team'] = team
  task = Task.objects.create(**task_json)
  return Response("Task created", status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def task_update(request, task_id):
  task_json = request.data
  Task.objects.filter(id=task_id).update(**task_json)
  return Response("Task updated", status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def task_destroy(request, task_id):
  Task.objects.filter(id=task_id).delete()
  return Response("Task deleted", status=status.HTTP_204_NO_CONTENT)