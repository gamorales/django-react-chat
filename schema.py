import json
import sys
import uuid
from datetime import datetime

import graphene


class User(graphene.ObjectType):
    id = graphene.ID(default_value=str(uuid.uuid4()))
    name = graphene.String()
    created_at = graphene.DateTime(default_value=datetime.now())
    avatar_url = graphene.String()

    def resolve_avatar_url(self, info):
        username = self.name.replace(" ", "-").lower()
        return f"https://www.gamorales.dev/{username}/{self.id}/"


class Query(graphene.ObjectType):
    users = graphene.List(User, limit=graphene.Int())

    def resolve_users(self, info, limit=None):
        return [
            User(id="1", name="Guillermo Morales", created_at=datetime.now()),
            User(id="2", name="Daniel Morales", created_at=datetime.now()),
            User(id="3", name="Gloria Morales", created_at=datetime.now()),
            User(id="4", name="Diana Arevalo", created_at=datetime.now()),
            User(id="5", name="Jhuliana Puerta", created_at=datetime.now()),
            User(id="6", name="Nestor Rivera", created_at=datetime.now()),
            User(id="7", name="Victor Rivera", created_at=datetime.now()),
            User(id="8", name="Olga Martinez", created_at=datetime.now()),
        ][:limit]


class CreateUser(graphene.Mutation):
    user = graphene.Field(User)

    class Arguments:
        username = graphene.String()

    def mutate(self, info, username):
        if info.context.get("connected"):
            user = User(name=username)
            return CreateUser(user=user)
        else:
            raise Exception("Not connected")


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

query = """
        query ($limit: Int) {
          users(limit: $limit) {
            id
            name
            createdAt
            avatarUrl
          }
        }
"""

mutation = """
          mutation($username: String){
            createUser(username: $username) {
              user {
                id
                name
                createdAt
                avatarUrl
              }
            }
          }
"""

rs_query = schema.execute(query, variable_values={"limit": int(sys.argv[1])})
rs_mutation = schema.execute(
    mutation, context={"connected": True}, variable_values={"username": sys.argv[2]}
)

data = json.dumps(dict(rs_mutation.data.items()), indent=4)
print(data)
data = json.dumps(dict(rs_query.data.items()), indent=4)
print(data)
