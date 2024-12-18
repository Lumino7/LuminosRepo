from django.contrib.auth.models import AbstractUser
from django.db import models

CATEGORY_CHOICES = {
    '': 'Select a category',
    'electronics': 'Electronics',
    'clothing': 'Clothing',
    'books': 'Books',
    'home': 'Home & Kitchen',
    'beauty': 'Beauty & Personal Care',
    'sports': 'Sports & Outdoors',
    'toys': 'Toys & Games',
    'health': 'Health & Wellness',
    'jewelry': 'Jewelry & Accessories',
    'automotive': 'Automotive',
    'groceries': 'Groceries',
    'furniture': 'Furniture',
    'music': 'Music & Movies',
    'pet': 'Pet Supplies',
    'tools': 'Tools & Home Improvement',
}


class User(AbstractUser):
    watchlist_items = models.ManyToManyField("Listing", blank=True)


class Listing(models.Model):
    name = models.CharField(max_length=64)
    price = models.DecimalField(decimal_places=2, max_digits=12)
    description = models.CharField(max_length=512)
    image_URL = models.URLField(max_length=512, blank=True)
    category = models.CharField(
        max_length=64, blank=True, choices=list(CATEGORY_CHOICES.items()))
    created_by = models.ForeignKey("User", on_delete=models.CASCADE)
    created_at = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    def get_category_fullname(self):
        return CATEGORY_CHOICES.get(self.category)

    def get_bids(self):
        return Bid.objects.filter(listing=self)

    def get_bid_count(self):
        return self.get_bids().count()

    def get_highest_bid(self):
        return max(self.get_bids(), default=None, key=lambda object: object.offer)

    def get_current_price(self):
        highest_bid = self.get_highest_bid()
        return highest_bid.offer if highest_bid is not None else self.price

    def get_comments(self):
        return Comment.objects.filter(listing=self)

    def get_comment_count(self):
        return self.get_comments().count()


class Bid(models.Model):
    listing = models.ForeignKey(
        "Listing", on_delete=models.CASCADE, related_name="bids")
    offer = models.DecimalField(decimal_places=2, max_digits=12)
    created_by = models.ForeignKey("User", on_delete=models.CASCADE)
    created_at = models.DateTimeField()


class Comment(models.Model):
    listing = models.ForeignKey(
        "Listing", on_delete=models.CASCADE, related_name="comments")
    comment = models.CharField(max_length=1024)
    created_by = models.ForeignKey("User", on_delete=models.CASCADE)
    created_at = models.DateTimeField()
