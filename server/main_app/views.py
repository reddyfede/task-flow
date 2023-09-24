import json
from django.http import JsonResponse
from .models import Task
from django.views.decorators.csrf import csrf_exempt
import datetime

def tasks_index(request):
  tasks = Task.objects.values()
  data = list(tasks)  
  return JsonResponse(data, safe=False) 

@csrf_exempt
def tasks_update(request):
  selected_task = json.loads(request.body)
  print(selected_task)
  tempTasks = Task.objects.values().order_by('id')
  
  for idx, task in enumerate(tempTasks):
    updateTask = Task.objects.get(id=task['id'])
    if idx == 0:
      updateTask.start_time = datetime.datetime(2023, 9, 24, 11, 00, tzinfo=datetime.timezone.utc)
    else:
      updateTask.start_time = Task.objects.get(id=tempTasks[idx-1]['id']).end_time
    time_change = datetime.timedelta(minutes=updateTask.duration)
    updateTask.end_time = updateTask.start_time + time_change
    updateTask.save()
  
  results = Task.objects.values().order_by('id')
  data = list(results) 
  return JsonResponse(data, safe=False) 