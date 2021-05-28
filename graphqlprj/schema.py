import graphene
import graphql_jwt

import apps.users.schema as users
import apps.tracks.schema as tracks


class Query(users.Query, tracks.Query, graphene.ObjectType):
    pass


class Mutation(users.Mutation, tracks.Mutation, graphene.ObjectType):
    """
    Example:

        mutation {
          tokenAuth (username: "myuser", password: "MyP4s$w0rd"){
            token
          }
        }

        mutation {
          verifyToken (token: "eyJ0eXAiOiJKV1QiLCJ....") {
            payload
          }
        }
    """

    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(
    query=Query,
    mutation=Mutation,
    # auto_camelcase=False,
)
