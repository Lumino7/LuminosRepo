from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("search", views.search, name="search"),
    path("new", views.new, name="new"),
    path("random", views.randompage, name="randompage"),
    path("<str:title>", views.showcontent, name="showcontent"),
    path("<str:title>/edit", views.editcontent, name="editcontent")
]
