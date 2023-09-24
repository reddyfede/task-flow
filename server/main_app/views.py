
from django.shortcuts import render
from django.http import JsonResponse
from .models import Task

def tasks_index(request):
  tasks = Task.objects.values()
  data = list(tasks)  
  return JsonResponse(data, safe=False) 
