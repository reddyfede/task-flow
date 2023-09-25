from django.db import models

# Create your models here.


class Task(models.Model):
  name = models.CharField(max_length=100)
  start_time = models.DateTimeField()
  end_time = models.DateTimeField()
  duration = models.IntegerField()
  actual_start_time = models.DateTimeField()
  actual_end_time = models.DateTimeField()
  in_progress = models.BooleanField(False)
  is_complete = models.BooleanField(False)


class TaskHistory(models.Model):
  name = models.CharField(max_length=100)
  start_time = models.DateTimeField()
  end_time = models.DateTimeField()
  duration = models.IntegerField()
  actual_start_time = models.DateTimeField()
  actual_end_time = models.DateTimeField()
  in_progress = models.BooleanField(False)
  is_complete = models.BooleanField(False)