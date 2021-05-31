import os

from django.contrib.auth.models import User
from channels.testing import ChannelsLiveServerTestCase
from selenium import webdriver


class ChatTest(ChannelsLiveServerTestCase):
    def setUp(self):
        self.username = "goku"
        self.password = "kamehameha"
        self.email = "goku@dragonball.com"
        User.objects.create_user(
            username=self.username,
            email=self.email,
            password=self.password
        )

        chromedriver = \
            "/Users/gmorales/Documents/development/python/graphql/graphqlprj/chromedriver"
        os.environ["webdriver.chrome.driver"] = chromedriver
        url = "http://localhost:3000/"
        self.driver = webdriver.Chrome(executable_path=chromedriver)
        self.driver.get(url)

    def test_send_message_in_chat_window(self):
        login = self.driver.find_element_by_class_name("MuiButton-label-100")
        login.click()
        user = self.driver.find_element_by_id("username")
        password = self.driver.find_element_by_id("password")
        user.send_keys(self.username)
        password.send_keys(self.password)
        login.click()

