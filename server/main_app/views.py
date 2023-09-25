import json
import time
from datetime import datetime, date, time, timedelta
from django.http import JsonResponse
from .models import Task, TaskHistory
from django.views.decorators.csrf import csrf_exempt

def tasks_index(request):
  tasks = Task.objects.values()
  data = list(tasks)  
  return JsonResponse(data, safe=False) 

@csrf_exempt
def tasks_update(request):
  selected_task = json.loads(request.body)
  tempTasks = Task.objects.values().order_by('id')
  #maybe remove for loop and pass selected_task.id on line 20
  for idx, task in enumerate(tempTasks):
    #maybe updateTake = tempTasks.get(id=task['id'])
    updateTask = Task.objects.get(id=task['id'])
    if updateTask.is_complete is not True:
      if idx == 0:
        if updateTask.in_progress is True:
          updateTask.actual_end_time = datetime.now()
          updateTask.in_progress = False
          updateTask.is_complete = True
        else:  
          updateTask.actual_start_time = datetime.now()
          updateTask.in_progress = True
      else:
        updateTask.start_time = Task.objects.get(id=tempTasks[idx-1]['id']).end_time
        # when task is completed, next task actual start time set to actual_end of inital task
      time_change = timedelta(minutes=updateTask.duration)
      updateTask.end_time = updateTask.start_time + time_change
      updateTask.save()
    else:
      print('REMOVE : ', task)
      # TaskHistory.objects.get_or_create(task)
      # updateTask.delete(task)

  results = Task.objects.values().order_by('id')
  data = list(results) 
  return JsonResponse(data, safe=False) 



# @csrf_exempt
# def tasks_update(request):
#   selected_task = json.loads(request.body)
#   tempTasks = Task.objects.values().order_by('id')
  
#   #maybe remove for loop and pass selected_task.id on line 20
#   for idx, task in enumerate(tempTasks):
#     #maybe updateTake = tempTasks.get(id=task['id'])
#     updateTask = Task.objects.get(id=task['id'])
#     if updateTask.is_complete is not True:
#       if idx == 0:
#         if updateTask.in_progress is True:
#           updateTask.actual_end_time = datetime.now()
#           updateTask.in_progress = False
#           updateTask.is_complete = True
#         else:  
#           updateTask.actual_start_time = datetime.now()
#           updateTask.in_progress = True
#       else:
#         updateTask.start_time = Task.objects.get(id=tempTasks[idx-1]['id']).end_time
#         # when task is completed, next task actual start time set to actual_end of inital task
#       time_change = timedelta(minutes=updateTask.duration)
#       updateTask.end_time = updateTask.start_time + time_change
#       updateTask.save()
#     else:
#       print('REMOVE : ', task)
#       # TaskHistory.objects.get_or_create(task)
#       # updateTask.delete(task)

#   results = Task.objects.values().order_by('id')
#   data = list(results) 
#   return JsonResponse(data, safe=False) 