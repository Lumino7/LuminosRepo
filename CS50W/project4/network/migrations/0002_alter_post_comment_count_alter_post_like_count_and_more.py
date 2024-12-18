# Generated by Django 4.2.5 on 2023-10-26 02:00

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("network", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="comment_count",
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name="post",
            name="like_count",
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="follows_count",
            field=models.IntegerField(null=True),
        ),
    ]
