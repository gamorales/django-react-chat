import os
import time
import json

from graphene_django.utils.testing import GraphQLTestCase
from django.contrib.auth.models import User
from channels.testing import ChannelsLiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class ChatTest(ChannelsLiveServerTestCase):
    def setUp(self):
        self.username = "admin"
        self.password = "admin"
        self.email = "goku@dragonball.com"
        User.objects.create_user(
            username=self.username,
            email=self.email,
            password=self.password
        )

        chromedriver = \
            "/home/radicaled/Documentos/desarrollo/python/bigdata/chromedriver"
        os.environ["webdriver.chrome.driver"] = chromedriver
        url = "http://localhost:3000/"
        self.driver = webdriver.Chrome(executable_path=chromedriver)
        self.driver.get(url)

    def test_send_message_in_chat_window(self):
        self._enter_main_app()
        time.sleep(2)
        self._enter_chat_room()
        time.sleep(2)
        message = self.driver.find_element_by_id("text-message")
        message.send_keys(f"Hello World!{Keys.RETURN}")
        time.sleep(4)

    def _enter_chat_room(self):
        room = self.driver.find_element_by_id("room-Anime")
        room.click()

    def _enter_main_app(self):
        login1 = self.driver.find_element_by_id("login-register")
        login1.click()
        user = self.driver.find_element_by_id("username")
        password = self.driver.find_element_by_id("password")
        user.send_keys(self.username)
        password.send_keys(self.password)
        login = self.driver.find_element_by_id("login")
        login.click()


class RoomTestCase(GraphQLTestCase):
    fixtures = ["rooms.json"]

    def test_list_all_rooms(self):
        response = self.query(
            '''
            query rooms{
              rooms{
                id
                name
                description
              }
            }
            ''',
            op_name='rooms'
        )

        content = json.loads(response.content)

        self.assertEqual(6, len(content['data']['rooms']))
        self.assertEqual(response.status_code, 200)
        self.assertResponseNoErrors(response)

    def test_search_room(self):
        response = self.query(
            '''
            query rooms($search: String){
              rooms (search: $search){
                id
                name
                description
              }
            }
            ''',
            op_name='rooms',
            variables={'search': 'Anime'}
        )

        content = json.loads(response.content)

        self.assertEqual(1, len(content['data']['rooms']))
        self.assertEqual(response.status_code, 200)
        self.assertResponseNoErrors(response)
