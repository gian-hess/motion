from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return f'{instance.id}/{filename}'


class User(AbstractUser):
    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=True)
    about_me = models.CharField(max_length=300, blank=True)
    location = models.CharField(max_length=100, blank=True)
    job = models.CharField(max_length=100, blank=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                                 message="Phone number must be entered in "
                                         "the format: '+999999999'. Up to 15 "
                                         "digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17,
                                    blank=True)
    avatar = models.ImageField(upload_to=user_directory_path, blank=True,
                               null=True)
    banner = models.ImageField(upload_to=user_directory_path, blank=True,
                               null=True)
    things_user_likes = models.CharField(max_length=300, blank=True)
    following = models.ManyToManyField(to="self", blank=True,
                                       symmetrical=False,
                                       related_name="followers")
    friends = models.ManyToManyField(to="self", blank=True)
    rejected = models.ManyToManyField(to="self", blank=True)

    def __str__(self):
        return self.username
