from django.urls import path

from user.views import FollowersList, FollowingList, ToggleFollow

urlpatterns = [
    path(
        'followers/',
        FollowersList.as_view()
    ),
    path(
        'following/',
        FollowingList.as_view()
    ),
    path(
        'toggle-follow/<int:pk>/',
        ToggleFollow.as_view()
    ),
]
