from django.db import models
from django.contrib.auth.models import User

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

ROLES = (
    ("M", "Manager"),
    ("E", "Employee"),
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


class AppUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(
        max_length=1,
        choices=ROLES,
        default=None,
        null=True,
    )
    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.role} - {self.team} - ({self.id})"


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
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.get_day_display()} - {self.user.user.first_name} {self.user.user.last_name} - ({self.id})"


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
    user = models.ForeignKey(
        AppUser,
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True,
    )

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
