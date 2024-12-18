from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.humanize.templatetags.humanize import intcomma
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseBadRequest, HttpResponseNotFound
from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.urls import reverse
from django.utils import timezone

from .models import User, Listing, CATEGORY_CHOICES, Bid, Comment
from .forms import ListingForm, BidForm, CommentForm


def index(request):
    listings = Listing.objects.filter(is_active=True)
    return render(request, "auctions/listings.html", {"listings": listings, "title": 'Active Listings'})


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
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")


def newitem(request):
    user = request.user

    if request.method == 'POST':
        form = ListingForm(request.POST)
        if form.is_valid():
            listing = form.save(commit=False)
            listing.created_by = user
            listing.created_at = timezone.now()
            listing.save()
            return HttpResponseRedirect(reverse("index"))
    else:
        form = ListingForm()

    return render(request, 'auctions/newitem.html', {'form': form})


def listing(request, id):
    user = request.user
    listing = get_object_or_404(Listing, id=id)
    is_in_watchlist = hasattr(user, 'watchlist_items') and user.watchlist_items.filter(pk=listing.pk).exists()
    is_created_by_user = listing.created_by == user
    highest_bid = listing.get_highest_bid()
    is_won_by_user = getattr(highest_bid, "created_by", None) == user

    if not listing.is_active:
        if is_won_by_user:
            messages.success(request, f"Congratulations! You won this listing!")

        else:
            if highest_bid is not None:
                messages.info(request, f"This listing was closed by the seller with a winning bid of €{intcomma(highest_bid.offer)}.")

            else:
                messages.info(request, f"This listing was closed by the seller with no bids.")


    messages_to_display = messages.get_messages(request)
    info_messages = [message.message for message in messages_to_display if message.tags == 'info']
    success_messages = [message.message for message in messages_to_display if message.tags == 'success']
    error_messages = [message.message for message in messages_to_display if message.tags == 'error']
    warning_messages = [message.message for message in messages_to_display if message.tags == 'warning']
    bid_form = BidForm()
    comment_form = CommentForm()

    comments = Comment.objects.filter(listing=listing)

    if request.method == 'POST':
        listing.is_active = False
        listing.save()
        messages.success(request, "You have closed this auction.")

        return HttpResponseRedirect(reverse("listing", args=[id]))

    else:
        return render(request, 'auctions/listing.html', {
            'listing': listing,
            'is_in_watchlist': is_in_watchlist,
            'is_created_by_user' : is_created_by_user,
            'is_won_by_user' : is_won_by_user,
            'bid_form': bid_form,
            'info_messages': info_messages,
            'success_messages' : success_messages,
            'error_messages': error_messages,
            'warning_messages': warning_messages,
            'comment_form': comment_form,
            'comments': comments
        })


def watchlist(request, id=None):
    user = request.user

    if request.method == 'POST':
        listing = get_object_or_404(Listing, id=id)
        is_in_watchlist = user.watchlist_items.filter(pk=listing.pk).exists()

        if is_in_watchlist:
            user.watchlist_items.remove(listing)
            messages.success(request, "Item removed from your watchlist")

        else:
            user.watchlist_items.add(listing)
            messages.success(request, "Item added to your watchlist")


        return HttpResponseRedirect(reverse("listing", args=[id]))
    else:
        listings = user.watchlist_items.all()
        return render(request, "auctions/listings.html", {"listings": listings, "title": 'Your Watchlist'})

def bid(request, id):
    user = request.user
    listing = get_object_or_404(Listing, id=id)

    if request.method == 'POST':
        form = BidForm(request.POST)
        form.instance.created_by = user
        form.instance.created_at = timezone.now()
        form.instance.listing = listing

        if form.is_valid():
            form.save()
            messages.success(request, "Your bid was submitted successfully!")

        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, error)


        return HttpResponseRedirect(reverse("listing", args=[id]))

    return HttpResponseNotFound()

def comment(request, id):
    user = request.user
    listing = get_object_or_404(Listing, id=id)

    if request.method == 'POST':
        form = CommentForm(request.POST)
        form.instance.created_by = user
        form.instance.created_at = timezone.now()
        form.instance.listing = listing

        if form.is_valid():
            form.save()
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, error)


        return HttpResponseRedirect(reverse("listing", args=[id]))

    return HttpResponseNotFound()

def closed(request):
    listings = Listing.objects.filter(is_active=False)
    return render(request, "auctions/listings.html", {"listings": listings, "title": 'Closed Listings'})

def categories(request):
    categories = CATEGORY_CHOICES
    return render(request, "auctions/categories.html", { "categories": categories })

def category(request, name):
    listings = Listing.objects.filter(is_active=True, category=name)
    category_name = CATEGORY_CHOICES.get(name)
    return render(request, "auctions/listings.html", {"listings": listings, "title": category_name})