from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    following = models.ManyToManyField("self", symmetrical=False, blank=True, related_name="followed_by") #related_name: reverse name. e.g. Bryan.followed_by will return all the users that follow Bryan.
    liked_posts = models.ManyToManyField("Post", blank=True, related_name="liked_by")

    def serialize(self, nested=False): #serialize meaning convert it into JSON.
        user = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
        }

        if not nested: #these had to be separate because each user also has to be serialized.
            user['following'] = [user.serialize(nested=True) for user in self.following.all()] #assigns a python list of users to the 'following' key of the user dict
            user['followed_by'] = [user.serialize(nested=True) for user in self.followed_by.all()]

        return user

class Post(models.Model):
    content = models.CharField(max_length=1024)
    created_by = models.ForeignKey("User", on_delete=models.CASCADE, related_name='created_posts')
    created_at = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey("User", on_delete=models.CASCADE, related_name='updated_posts', null=True)
    updated_at = models.DateTimeField(null=True)

    def serialize(self):
        data = {
            "id": self.id,
            "content": self.content,
            "created_by": self.created_by.serialize(),
            "created_at": self.created_at.strftime("%b %d %Y, %I:%M %p"),
            "updated_by": None,
            "updated_at": None,
            "liked_by": [user.serialize() for user in self.liked_by.all()],
        }

        if self.updated_at is not None:
            data["updated_at"] = self.updated_at.strftime("%b %d %Y, %I:%M %p")


        if self.updated_by is not None:
            data["updated_by"] = self.updated_by.serialize()

        return data


class Comment(models.Model):
    content = models.CharField(max_length=1024)
    post = models.ForeignKey("Post", on_delete=models.CASCADE)
    created_by = models.ForeignKey("User", on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

