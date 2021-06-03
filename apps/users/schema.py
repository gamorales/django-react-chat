from django.contrib.auth import get_user_model

import graphene
from graphene import ObjectType, String
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        only_fields = ("id", "username", "email", "password", "date_joined")


class Query(graphene.ObjectType):
    me = graphene.Field(UserType)
    user = graphene.Field(UserType, user_id=graphene.Int(required=True))
    users = graphene.List(UserType)

    def resolve_users(self, info):
        """
        Example:
            query {
              users {
                id
                username
                email
              }
            }
        """
        return get_user_model().objects.all()

    @login_required
    def resolve_me(self, info, *args, **kwargs):
        """
        Just works with Authorization header, obtained after login
        Example:
            query {
                me {
                    id
                    username
                    email
                }
            }
        """
        return info.context.user

    def resolve_user(self, info, user_id):
        """
        Example:
            {
              user(userId: 1) {
                username
                email
                dateJoined
              }
            }
        """
        return get_user_model().objects.get(pk=user_id)


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        """
        Example:
            mutation($email: String!, $username: String!, $password: String!){
                createUser(
                    username: "myusername",
                    password: "MyP4s$w0rd",
                    email: "info@info.com"
                ) {
                  user {
                    id
                    username
                    password
                    email
                  }
                }
            }
        """
        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
