import json

from django.contrib.auth.models import User
from graphene_django.utils.testing import GraphQLTestCase


class UserTestCase(GraphQLTestCase):
    def setUp(self):
        self.username = "goku"
        self.password = "kamehameha"
        self.email = "goku@dragonball.com"
        User.objects.create_user(
            username=self.username, email=self.email, password=self.password
        )

    def test_register_user_mutation(self):
        response = self.query(
            """
            mutation createUser($email: String!, $username: String!, $password: String!){
                createUser(
                    username: $username,
                    password: $password,
                    email: $email
                ) {
                  user {
                    id
                    username
                    password
                    email
                  }
                }
            }
            """,
            op_name="createUser",
            variables={
                "email": "vegueta@dragonball.com",
                "username": "vegueta",
                "password": self.password,
            },
        )

        content = json.loads(response.content)
        self.assertIn("id", content["data"]["createUser"]["user"])
        self.assertEqual(response.status_code, 200)
        self.assertResponseNoErrors(response)

    def test_login_user_mutation(self):
        response = self.query(
            """
            mutation tokenAuth($username: String!, $password: String!){
              tokenAuth (username: $username, password: $password){
                token
              }
            }
            """,
            op_name="tokenAuth",
            variables={"username": self.username, "password": self.password},
        )

        content = json.loads(response.content)
        self.assertIn("token", content["data"]["tokenAuth"])
        self.assertEqual(response.status_code, 200)
        self.assertResponseNoErrors(response)
