import json
from concurrent.futures.thread import ThreadPoolExecutor

from django.contrib.auth.models import User
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils import timezone, dateformat

from .models import Message
from graphqlprj.utils import decoupled


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_id = self.scope["url_route"]["kwargs"]["room_id"]
        self.room_group_name = "chat_%s" % self.room_name
        self.username = ""

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        self.username = text_data_json["user"]

        # Save message
        await self.save_message(message)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message", "message": message}
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]

        # Checks if message contains the command '/stock=
        if "/stock=" in message:
            stock = message.split("/stock=")
            with ThreadPoolExecutor() as executor:
                future = executor.submit(decoupled, stock[1])
                message = future.result()

        # Send message to WebSocket
        data_dict = {
            "message": message,
            "user": self.username,
            "time": dateformat.format(timezone.now(), "Y-m-d H:i:s"),
        }
        await self.send(text_data=json.dumps(data_dict))

    @database_sync_to_async
    def save_message(self, message):
        user = User.objects.filter(username__exact=self.username).first()

        Message.objects.create(
            room_id=self.room_id,
            user_id=user.id,
            message=message,
            command=False,
            time_send=dateformat.format(timezone.now(), "Y-m-d H:i:s"),
        )
