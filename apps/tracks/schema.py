from django.db.models import Q

import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import user_passes_test

from .models import Track
from graphqlprj.utils.decorators import user_record_owner


class TrackType(DjangoObjectType):
    class Meta:
        model = Track


class Query(graphene.ObjectType):
    tracks = graphene.List(TrackType, search=graphene.String())

    def resolve_tracks(self, info, search=None):
        """
        Example:

            {
              tracks{
                id
                title
                description
                url
                postedBy {
                  username
                  email
                }
              }
            }
            {
              tracks (search: "some"){
                id
                title
                description
                url
                postedBy {
                  username
                  email
                }
              }
        """
        if search:
            filter = (
                Q(title__icontains=search)
                | Q(description__icontains=search)
                | Q(url__icontains=search)
                | Q(posted_by__username__icontains=search)
            )
            return Track.objects.filter(filter)

        return Track.objects.all()


class CreateTrack(graphene.Mutation):
    """
    Example:

        mutation {
          createTrack(
            description: "Description 5",
            title: "Track 5",
            url: "https://track5.com") {
            track {
              id
              title
              description
              url
              createdAt
            }
          }
        }
    """

    track = graphene.Field(TrackType)

    class Arguments:
        title = graphene.String()
        description = graphene.String()
        url = graphene.String()

    @user_passes_test(
        lambda user: user.is_authenticated, GraphQLError("Login to create Track.")
    )
    def mutate(self, info, **kwargs):
        user = info.context.user

        track = Track(
            title=kwargs.get("title"),
            description=kwargs.get("description"),
            url=kwargs.get("url"),
            posted_by=user,
        )
        track.save()
        return CreateTrack(track=track)


class UpdateTrack(graphene.Mutation):
    """
    Example:

        mutation {
          updateTrack(
                id: 1,
                description: "The Description",
                title: "The Track",
                url: "https://www.track.com") {
            track {
              id
              title
              description
              url
              createdAt
            }
          }
        }
    """

    track = graphene.Field(TrackType)

    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String()
        description = graphene.String()
        url = graphene.String()

    def mutate(self, info, **kwargs):
        user = info.context.user
        track = Track.objects.get(pk=kwargs.get("id"))

        if track.posted_by != user:
            raise GraphQLError("Not allowed to update this Track.")

        track.title = kwargs.get("title")
        track.description = kwargs.get("description")
        track.url = kwargs.get("url")
        track.save()

        return UpdateTrack(track=track)

    @user_record_owner(
        exc=GraphQLError("Not allowed to update this Track."),
        model=Track, field="posted_by", pk_field="id"
    )
    def mutata(self, info, **kwargs):
        track = Track.objects.get(pk=kwargs.get("id"))
        track.title = kwargs.get("title")
        track.description = kwargs.get("description")
        track.url = kwargs.get("url")
        track.save()

        return UpdateTrack(track=track)


class DeleteTrack(graphene.Mutation):
    """
    Example:

        mutation {
            deleteTrack(id:6) {
                trackId
            }
        }
    """

    track_id = graphene.Int()

    class Arguments:
        id = graphene.Int(required=True)

    @user_record_owner(
        exc=GraphQLError,
        model=Track,
        field="posted_by",
        pk_field="id",
        message="Not allowed to update this Track.",
    )
    def mutate(self, info, id):
        try:
            track = Track.objects.get(id=id)
            track.delete()

            return DeleteTrack(track_id=id)
        except Track.DoesNotExist:
            raise GraphQLError(f"Track '{id}' doesn't exists.")


class Mutation(graphene.ObjectType):
    create_track = CreateTrack.Field()
    update_track = UpdateTrack.Field()
    delete_track = DeleteTrack.Field()