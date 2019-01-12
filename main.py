import webapp2
import jinja2
import os
import logging
import time

from google.appengine.ext import ndb

env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainPage(webapp2.RequestHandler):
    def get(self):
        template = env.get_template("templates/home.html")
        self.response.write(template.render())

class FilterHandler(webapp2.RequestHandler):
    def get(self):
        template = env.get_template("templates/filter.html")
        self.response.write(template.render())
    def post(self):
        groupname = self.request.get("groupname")
        groupname = self.request.get("groupname")
        groupname = self.request.get("groupname")
        min = self.request.get("min")
        max = self.request.get("max")
        self.redirect("/filter")

class InitiatorHandler(webapp2.RequestHandler):
    def get(self):
        template = env.get_template("templates/initiator.html")
        self.response.write(template.render())

    def post(self):
        self.redirect("/initiator")

class JoinerHandler(webapp2.RequestHandler):
    def get(self):
        template = env.get_template("templates/joiner.html")
        self.response.write(template.render())

    def post(self):
        name = self.request.get("name")
        self.redirect("/joiner")

class SwipeHandler(webapp2.RequestHandler):
    def get(self):
        template = env.get_template("templates/swipe.html")
        self.response.write(template.render())

    def post(self):
        self.redirect("/swipe")


app = webapp2.WSGIApplication([
    ("/", MainPage),
    ("/filter", FilterHandler),
    ("/initator", InitiatorHandler),
    ("/joiner", JoinerHandler),
    ("/swipe", SwipeHandler),
], debug=True)
