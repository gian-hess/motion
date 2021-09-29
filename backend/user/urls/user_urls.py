from django.urls import path

from user.views import UserList, RetrieveUpdateDestroyMyUserView, RetrieveUserView

urlpatterns = [
    path(
        '',
        UserList.as_view()
    ),
    path(
        'me/',
        RetrieveUpdateDestroyMyUserView.as_view()
    ),
    path(
        '<int:pk>/',
        RetrieveUserView.as_view()
    ),
    path(
        '<str:search>',
        UserList.as_view()
    ),
]
