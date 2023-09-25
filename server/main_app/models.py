from django.db import models

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


class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
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
        return f"{self.first_name} {self.last_name} - {self.role} - {self.team} - ({self.id})"


class Availability(models.Model):
    day = models.IntegerField(
        choices=DAYS,
    )
    pre_lunch_start = models.TimeField()
    pre_lunch_end = models.TimeField()
    post_lunch_start = models.TimeField(
        default=None,
        blank=True,
        null=True,
    )
    post_lunch_end = models.TimeField(
        default=None,
        blank=True,
        null=True,
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.get_day_display()} - {self.user.first_name} {self.user.last_name} - ({self.id})"


class Task(models.Model):
    name = models.CharField(max_length=50)
    duration = models.IntegerField()
    start_datetime = models.DateTimeField(
        default=None,
        blank=True,
        null=True,
    )
    end_datetime = models.DateTimeField(
        default=None,
        blank=True,
        null=True,
    )
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"{self.name} - {self.duration} - {self.team.name} - ({self.id})"


class TaskLog(models.Model):
    description = models.CharField(max_length=2, choices=LOGS_TYPE)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField(
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
        return f"{self.get_description_display()} - {self.task.name} - ({self.id})"
