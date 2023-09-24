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
  tempTasks = Task.objects.values().order_by('id')
  
  for idx, task in enumerate(tempTasks):
    updateTask = Task.objects.get(id=task['id'])
    if idx == 0:
      updateTask.startTime = datetime.datetime(2023, 9, 24, 11, 00, tzinfo=datetime.timezone.utc)
    else:
      updateTask.startTime = Task.objects.get(id=tempTasks[idx-1]['id']).endTime
    time_change = datetime.timedelta(minutes=updateTask.duration)
    updateTask.endTime = updateTask.startTime + time_change
    updateTask.save()
  
  results = Task.objects.values().order_by('id')
  data = list(results) 
  return JsonResponse(data, safe=False) 