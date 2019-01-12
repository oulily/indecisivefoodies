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
<<<<<<< HEAD

        self.redirect("/filter")
>>>>>>> 1f0078f14135e1062aafa6997284a282170d9112

class InitiatorHandler(webapp2.RequestHandler):
    def get(self):
        template = env.get_template("templates/initiator.html")
        self.response.write(template.render())

    def post(self):
        name = self.request.get("name")
        self.redirect("/initiator")

class JoinerHandler(webapp2.RequestHandler):
    def get(self):
        template = env.get_template("templates/joiner.html")
        self.response.write(template.render())

    def post(self):
        name = self.request.get("name")
<<<<<<< HEAD
        self.redirect("/joiner.html")
=======
        self.redirect("/joiner")
>>>>>>> 1f0078f14135e1062aafa6997284a282170d9112


app = webapp2.WSGIApplication([
    ("/", MainPage),
    ("/filter", FilterHandler),
    ("/initator", InitiatorHandler),
    ("/joiner", JoinerHandler),
], debug=True)
