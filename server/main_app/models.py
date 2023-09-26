from django.db import models
from rest_framework import serializers
from django.contrib.auth.models import User


ROLES = (
    ("M", "Manager"),
    ("E", "Employee"),
)

# Create your models here.
DAYS = (
    (0, "Monday"),
    (1, "Tuesday"),
    (2, "Wednesday"),
    (3, "Thursday"),
    (4, "Friday"),
    (5, "Saturday"),
    (6, "Sunday"),
)


LOGS_TYPE = (
    ("TS", "Task Started"),
    ("TP", "Task Paused"),
    ("TI", "Task With Issue"),
    ("TR", "Task Restarted"),
    ("TE", "Task Ended"),
)


class Team(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} - ({self.id})"


class UserSerializer(serializers.ModelSerializer):
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())

    class Meta(object):
        model = User
        fields = ['id', 'username','password','email']

class Employee(serializer.Model())

class Availability(models.Model):
    day = models.IntegerField(
        choices=DAYS,
    )
    first_part_shift_begin = models.TimeField()
    first_part_shift_end = models.TimeField()
    second_part_shift_begin = models.TimeField(
        default=None,
        blank=True,
        null=True,
    )
    second_part_shift_end = models.TimeField(
        default=None,
        blank=True,
        null=True,
    )
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    user = models.CharField()

    def __str__(self):
        return f"{self.get_day_display()} - {self.user.first_name} {self.user.last_name} - ({self.id})"


class Task(models.Model):
    name = models.CharField(max_length=50)
    due_date = models.DateField()
    planned_duration = models.IntegerField()
    planned_start = models.DateTimeField(
        default=None,
        blank=True,
        null=True,
    )
    planned_end = models.DateTimeField(
        default=None,
        blank=True,
        null=True,
    )
    actual_duration = models.IntegerField(
        default=None,
        blank=True,
        null=True,
    )
    actual_start = models.DateTimeField(
        default=None,
        blank=True,
        null=True,
    )
    actual_end = models.DateTimeField(
        default=None,
        blank=True,
        null=True,
    )
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    user = models.CharField()
    # user = models.ForeignKey(
    #     User,
    #     on_delete=models.CASCADE,
    #     default=None,
    #     blank=True,
    #     null=True,
    # )

    def __str__(self):
        return f"{self.name} - {self.due_date} - {self.planned_duration} - {self.team.name} - ({self.id})"


class TaskLog(models.Model):
    type = models.CharField(max_length=2, choices=LOGS_TYPE)
    description = models.CharField(max_length=100)
    start = models.DateTimeField()
    end = models.DateTimeField(
        default=None,
        blank=True,
        null=True,
    )
    duration = models.IntegerField(
        default=None,
        blank=True,
        null=True,
    )
    task = models.ForeignKey(Task, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.get_type_display()} - {self.task.name} - ({self.id})"
