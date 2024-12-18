import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponseRedirect, render, get_object_or_404
from django.urls import reverse
from django.core import serializers
from django.core.paginator import Paginator
from django.utils import timezone

from .models import User, Post, Comment
from .forms import PostForm, CommentForm


def index(request):
    user = request.user

    form = PostForm()
    comment_form = CommentForm()

    return render(
        request, "network/index.html", {"form": form, "comment_form": comment_form}
    )


def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(
                request,
                "network/login.html",
                {"message": "Invalid username and/or password."},
            )
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("login"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(
                request, "network/register.html", {"message": "Passwords must match."}
            )

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(
                request, "network/register.html", {"message": "Username already taken."}
            )
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")



def posts(request, list, page):
    # Filter posts returned based on list
    if list == "all":
        posts = Post.objects.all()
    elif list == "following":
        posts = Post.objects.filter(
            created_by__in=request.user.following.all()  # __in = Django queryset lookup
        )
    elif User.objects.filter(username=list).exists(): #if a user with the username=list exists
        posts = Post.objects.filter(created_by__username=list)
    else:
        return JsonResponse({"error": "Invalid list."}, status=400)

    # Return posts in reverse chronologial order
    posts = posts.order_by("-created_at").all() # (-) indicates descending order
    paginator = Paginator(posts, 10)
    posts = paginator.page(page).object_list #object_list is an attribute of a Paginator object.
    posts = [post.serialize() for post in posts] #serialize is a custom method of the Post object I made in models.py
    num_pages = paginator.num_pages

    response_data = {
        "posts": posts,
        "num_pages": num_pages,
    }

    return JsonResponse(response_data, safe=False)


def user(request, username):
    user = User.objects.get(username=username)
    user = user.serialize()
    return JsonResponse(user, safe=False)


@login_required
def new_post(request):
    user = request.user

    if request.method == "POST":
        data = json.loads(request.body) #parses the body (JSON) into a python object.
        post_form = PostForm(data) #creates a PostForm instance using data.

        if post_form.is_valid(): #.is_valid is a Django form method.
            post = post_form.save(commit=False) #creates an an instance of the Post Model.
            post.created_by = user
            post.created_at = timezone.now()
            post.save() #saves the instance to the DB.
            return JsonResponse(post.serialize()) #Standard practice, so the post can be accessed in the devtools.

    return JsonResponse({'error':''}, status=400)

@login_required
def edit_post(request, id):
    user = request.user

    if request.method == "PATCH":
        data = json.loads(request.body)
        post = get_object_or_404(Post, id=id)

        # Ensure only the creator of the post can edit it
        if user != post.created_by:
            return JsonResponse({'error': 'Permission denied' }, status=403)

        post_form = PostForm(data, instance=post) #instance is built-in parameter. Gets that particular instance of the Form class so I can modify it.

        if post_form.is_valid():
            post = post_form.save(commit=False)
            post.updated_by = user
            post.updated_at = timezone.now()
            post.save()
            return JsonResponse(post.serialize())

    return JsonResponse({'error':''}, status=400)

@login_required
def like_post(request,id):
    user = request.user
    post = get_object_or_404(Post, id=id) #finds a post with the passed id from the Post Model.

    if request.method == "POST":
        user.liked_posts.add(post)
        return JsonResponse(post.serialize(), status=200)


    if request.method == "DELETE":
        user.liked_posts.remove(post)
        return JsonResponse(post.serialize(), status=200)


    return JsonResponse({'error':''}, status=400)

@login_required
def follow_user(request, username):
    target_user = get_object_or_404(User, username=username)

    if request.method == "POST":
        target_user.followed_by.add(request.user)
        return JsonResponse(target_user.serialize(), status=200)


    if request.method == "DELETE":
        target_user.followed_by.remove(request.user)
        return JsonResponse(target_user.serialize(), status=200)


    return JsonResponse({'error':''}, status=400)

