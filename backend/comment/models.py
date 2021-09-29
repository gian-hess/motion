from django.contrib.auth import get_user_model
from django.db import models

from post.models import Post

User = get_user_model()


class Comment(models.Model):
    content = models.TextField(max_length=500)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, related_name='Comments', on_delete=models.PROTECT, default=1)
    post = models.ForeignKey(to=Post, related_name='Comments', on_delete=models.CASCADE, default=1)
