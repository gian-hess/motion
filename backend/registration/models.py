import random

from django.contrib.auth import get_user_model

from django.db import models

User = get_user_model()


def code_generator(length=6):
    numbers = '0123456789'
    return ''.join(random.choice(numbers) for _ in range(length))


class Registration(models.Model):
    code = models.CharField(max_length=6, default=code_generator)
    subject = models.CharField(max_length=1, choices=[("R", "registration"), ("P", "password_reset")], default="R")
    is_used = models.BooleanField(default=False)
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, related_name='registration', primary_key=True)
