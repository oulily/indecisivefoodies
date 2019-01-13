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

class Person(ndb.Model):
    name = ndb.StringProperty()
    code = ndb.StringProperty()

class Like(ndb.Model):
    friend = ndb.StringProperty()
    rest = ndb.StringProperty()

class Superlike(ndb.Model):
    friend2 = ndb.StringProperty()
    rest2 = ndb.StringProperty()

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

        code = self.request.get("code")
        name = self.request.get("name")
        # 2. Read/write from the database

        filter = Filter(groupname=groupname, zipcode=zipcode, priority=priority, number=number) # creates an instance of an object
        filter.put() #adds filter object to database

        person = Person(code=code, name=name)
        person.put()

        # 3. Render the response
        time.sleep(2) # gives it time to render
        self.redirect("/initiator")

class InitiatorPage(webapp2.RequestHandler):
    def get(self):
        template = env.get_template("templates/initiator.html")
        self.response.write(template.render())

class JoinerPage(webapp2.RequestHandler):
    def get(self):
        template = env.get_template("templates/joiner.html")
        self.response.write(template.render())

    def post(self):
        self.redirect("/joiner")

class PersonHandler(webapp2.RequestHandler):
    def post(self):
        code = self.request.get("code")
        name = self.request.get("name")

        person = Person(code=code, name=name)
        person.put()

        time.sleep(2)
        self.redirect("/swipe")

class SwipePage(webapp2.RequestHandler):
    def get(self):

        # all_likes = Like.query().fetch()
        #
        # rest1_likes []
        # for like in all_likes:
        #     if like in all_likes.filter(Like.rest == rest1).get()
        #         rest1_likes.append(like)
        #

        template = env.get_template("templates/swipe.html")
        self.response.write(template.render())

    def post(self):
        self.redirect("/swipe")

class ResultsHandler(webapp2.RequestHandler):
    def post(self):

        time.sleep(2)
        self.redirect("/results")

class ResultsPage(webapp2.RequestHandler):
    def get(self):

        template = env.get_template("templates/results.html")
        self.response.write(template.render())

    def post(self):
        self.redirect("/results")


app = webapp2.WSGIApplication([
    ("/", MainPage),
    ("/filter", FilterPage),
    ("/inithandler", InitiatorHandler),
    ("/initiator", InitiatorPage),
    ("/joiner", JoinerPage),
    ("/personhandler", PersonHandler),
    ("/swipe", SwipePage),
    ("/resultshandler", ResultsHandler),
    ("/results", ResultsPage),
], debug=True)
