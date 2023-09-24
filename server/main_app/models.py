import django
from django.db import models
import datetime

# Create your models here.


class Task(models.Model):
  name = models.CharField(max_length=100)
  startTime = models.DateTimeField()
  endTime = models.DateTimeField()
  duration = models.IntegerField()