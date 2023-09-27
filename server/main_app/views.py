from django.http import JsonResponse
from django.core.serializers import serialize
import json
from django.shortcuts import render
from .models import AppUser, Task, Team
from .serializers import UserSerializer 
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

@api_view(['POST'])
def signup(request):
  serializer = UserSerializer(data = request.data)
  if serializer.is_valid():
    serializer.save()
    user = User.objects.get(username = request.data['username'])
    role = request.data['role']
    token = Token.objects.create(user=user)
    user.set_password(request.data['password'])
    user.save()
    app_user = AppUser.objects.create(user = user, role=role)
    return Response({'token': token.key, 'user': serializer.data})
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
  user = get_object_or_404(User, username=request.data['username'])
  if not user.check_password(request.data['password']):
      return Response("Username or Password invalid.", status=status.HTTP_404_NOT_FOUND)
  token, created = Token.objects.get_or_create(user=user)
  app_user = AppUser.objects.get(user = user)

  serializer = UserSerializer(user)
  return Response({'token': token.key, 'user': serializer.data['username'], 'role': app_user.role})

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
  return Response("Token success")

def home(request):
  return render(request, 'home.html')

@api_view(['GET'])
def task_(request):
  user = get_object_or_404(User, username=request.data['username'])
  if not user.check_password(request.data['password']):
      return Response("Username or Password invalid.", status=status.HTTP_404_NOT_FOUND)
  token, created = Token.objects.get_or_create(user=user)
  app_user = AppUser.objects.get(user = user)

  serializer = UserSerializer(user)
  return Response({'token': token.key, 'user': serializer.data['username'], 'role': app_user.role})

@api_view(['GET'])
def tasks_index(request):
  task = Task.objects.all().values()
  return Response(task)

@api_view(['GET'])
def task_detail(request, task_id):
  task = Task.objects.get(id=task_id)
  print(task)
  return Response({'tasks': task})

@api_view(['POST'])
def task_create(request):
  task_json = request.data
  print(task_json['team'])
  team = Team.objects.get(id=task_json['team'])
  task_json['team'] = team
  task = Task.objects.create(**task_json)
  return Response("Task created.", status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def task_update(request, task_id):
  task_json = request.data
  Task.objects.filter(id=task_id).update(**task_json)
  return Response("Task updated.", status=status.HTTP_204_NO_CONTENT)