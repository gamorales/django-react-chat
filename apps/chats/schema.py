from django.db.models import Q

import graphene
from graphene_django import DjangoObjectType

from .models import Room, Message


class RoomType(DjangoObjectType):
    class Meta:
        model = Room


class MessageType(DjangoObjectType):
    class Meta:
        model = Message


class Query(graphene.ObjectType):
    rooms = graphene.List(RoomType, search=graphene.String())
    messages = graphene.List(MessageType, room=graphene.Int())

    def resolve_rooms(self, info, search=None):
        """
        Example:

            {
              rooms {
                id
                name
                description
              }
            }
            {
              rooms (search: "Anime"){
                id
                name
                description
                created_at
              }
            }
        """
        if search:
            filter = Q(name__icontains=search) | Q(description__icontains=search)
            return Room.objects.filter(filter)

        return Room.objects.all()

    def resolve_messages(self, info, room=None):
        if room:
            return reversed(
                Message.objects.filter(room=room).order_by("-time_send")[:50]
            )

        return Message.objects.all()
