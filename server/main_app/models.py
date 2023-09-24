from django.db import models

# Create your models here.


class Task(models.Model):
  name = models.CharField(max_length=100)
  start_time = models.DateTimeField()
  end_time = models.DateTimeField()
  duration = models.IntegerField()