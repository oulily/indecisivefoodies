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

    def post(self):
        name = self.request.get("name")
        self.redirect("/")

class FilterHandler(webapp2.RequestHandler):
    def get(self):
        template = env.get_template("templates/filter.html")
        self.response.write(template.render())

    def post(self):
        name = self.request.get("name")
        self.redirect("/filter.html")

class InitiatorHandler(webapp2.RequestHandler):
    def get(self):
        template = env.get_template("templates/home.html")
        self.response.write(template.render())

    def post(self):
        name = self.request.get("name")
        self.redirect("/")

class JoinerHandler(webapp2.RequestHandler):
    def get(self):
        template = env.get_template("templates/joiner.html")
        self.response.write(template.render())

    def post(self):
        name = self.request.get("name")
        self.redirect("/joiner.html")


app = webapp2.WSGIApplication([
    ("/", MainPage),
    ("/filter", FilterHandler),
    ("/initator", InitiatorHandler),
    ("/joiner", JoinerHandler),
], debug=True)
