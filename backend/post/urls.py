from django.urls import path
from .views import ListCreatePostView, GetUpdateDeletePostView, \
    ListUserLikedPosts, ListUserFollowingPosts, ListUserPosts, ToggleLikes, ListFriendsPosts

urlpatterns = [
    path('', ListCreatePostView.as_view()),
    path('<int:id>/', GetUpdateDeletePostView.as_view()),
    path('toggle-like/<int:pk>/', ToggleLikes.as_view()),
    path('likes/', ListUserLikedPosts.as_view()),
    path('following/', ListUserFollowingPosts.as_view()),
    path('friends/', ListFriendsPosts.as_view()),
    path('user/<int:id>/', ListUserPosts.as_view()),
]
