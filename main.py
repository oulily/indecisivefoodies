import webapp2
import jinja2
import os
import logging
import time

from google.appengine.ext import ndb

class Restaurant(ndb.Model):
    name = ndb.StringProperty()
    distance = ndb.StringProperty()
    price = ndb.StringProperty()
    im1 = ndb.BlobProperty()
    im2 = ndb.BlobProperty()
    im3 = ndb.BlobProperty()
    numResults = ndb.IntegerProperty()

class Filter(ndb.Model): # creates an object
    groupname = ndb.StringProperty()
    zipcode = ndb.StringProperty()
    priority = ndb.StringProperty()
    number = ndb.StringProperty()

env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainPage(webapp2.RequestHandler): # webapp2.RequestHandler processes the request, manipulates data and defines a response to be returned to the client
    def get(self):
        template = env.get_template("templates/home.html")
        self.response.write(template.render())


class FilterPage(webapp2.RequestHandler):
    def get(self):
        template = env.get_template("templates/filter.html")
        self.response.write(template.render())

class InitiatorHandler(webapp2.RequestHandler):
    def post(self):
        groupname = self.request.get("groupname") # gets information from the filter page
        zipcode = self.request.get("zipcode")
        priority = self.request.get("priority")
        number = self.request.get("number")

        # 2. Read/write from the database
        filter = Filter(groupname=groupname, zipcode=zipcode, priority=priority, number=number) # creates an instance of an object
        filter.put() #adds filter object to database

        # 3. Render the response
        time.sleep(2) # gives it time to render
        self.redirect("/initiator")

class InitiatorPage(webapp2.RequestHandler):
    def get(self):
        template = env.get_template("templates/initiator.html")
        self.response.write(template.render())

    # def post(self):
    #     self.redirect("/initiator")

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
    ("/filter", FilterPage),
    ("/inithandler", InitiatorHandler),
    ("/initiator", InitiatorPage),
    ("/joiner", JoinerHandler),
    ("/swipe", SwipeHandler),
], debug=True)
