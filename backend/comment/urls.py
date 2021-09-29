from django.urls import path

from comment.views import ListCreateCommentView

urlpatterns = [
    path(
        '<int:pk>/',
        ListCreateCommentView.as_view()
    ),
]
