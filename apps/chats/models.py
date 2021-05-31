import uuid

from django.db import models
from django.contrib.auth import get_user_model


class Room(models.Model):
    name = models.CharField(max_length=26)
    description = models.TextField(default="Room")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, default=1)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    message = models.TextField()
    command = models.BooleanField(default=False)
    time_send = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)
