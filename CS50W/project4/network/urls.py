
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("posts/<str:list>/<int:page>", views.posts, name="posts"),
    path("users/<str:username>", views.user, name = "user"),
    path("users/<str:username>/follow", views.follow_user, name = "follow_user"),
    path("posts/new", views.new_post, name="new_post"),
    path("posts/<int:id>/edit", views.edit_post, name="edit_post"),
    path("posts/<int:id>/like", views.like_post, name="like_post")
]
