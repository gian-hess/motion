from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class FriendRequest(models.Model):
    status = models.CharField(max_length=1,
                              choices=[("P", "pending"), ("A", "accepted"),
                                       ("R", "rejected")],
                              default="P")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    receiver = models.ForeignKey(to=User,
                                 related_name='friend_requests_received',
                                 on_delete=models.CASCADE)
    requester = models.ForeignKey(to=User, related_name='friend_requests_sent',
                                  on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.requester} wants to be friends with {self.receiver} ' \
               f'(status: {self.status})'
