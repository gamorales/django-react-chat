from django.db.models import Q

import graphene
from graphene_django import DjangoObjectType

from .models import Room


class RoomType(DjangoObjectType):
    class Meta:
        model = Room


class Query(graphene.ObjectType):
    rooms = graphene.List(RoomType, search=graphene.String())

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
            return Room.objects.filter(name__icontains=search)

        return Room.objects.all()
