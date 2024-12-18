# Generated by Django 4.2.5 on 2023-11-10 18:48

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("network", "0004_alter_comment_created_at_alter_post_comment_count_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="post",
            name="comment_count",
        ),
        migrations.RemoveField(
            model_name="post",
            name="like_count",
        ),
        migrations.AlterField(
            model_name="user",
            name="following",
            field=models.ManyToManyField(
                default=0, related_name="followed_by", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
