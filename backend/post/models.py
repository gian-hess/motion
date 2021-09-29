from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Post(models.Model):
    content = models.TextField(max_length=500)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(to=User, related_name='Posts',
                             on_delete=models.PROTECT, default=1)
    liked = models.ManyToManyField(to=User, blank=True,
                                   related_name='liked_Posts')
