from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path("ws/chats/<room_name>/<room_id>/", consumers.ChatConsumer.as_asgi()),
]
