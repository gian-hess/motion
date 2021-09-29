from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView, \
    RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from friend_request.models import FriendRequest
from friend_request.serializers import FriendRequestSerializer, \
    CreateFriendRequestSerializer
from django.db.models import Q
from django.contrib.auth import get_user_model

from motion_backend.permissions import IsReceiver, IsRequesterOrReceiver
from user.serializers import ListUserSerializer

User = get_user_model()


class CreateFriendRequestsView(CreateAPIView):
    queryset = FriendRequest.objects.all()
    serializer_class = CreateFriendRequestSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        receiver = User.objects.get(id=self.kwargs['id'])
        if receiver == self.request.user:
            return Response({"detail": "Users cannot do this operation with themselves."})
        else:
            if receiver in [elem.receiver for elem in FriendRequest.objects.filter(receiver=receiver)] or \
                    self.request.user in [elem.receiver for elem in FriendRequest.objects.filter(requester=receiver)]:
                return Response({"detail": "You can only make one request to one user!"})
            else:
                return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        friend_id = self.kwargs['id']
        receiver = User.objects.get(id=friend_id)
        serializer.save(receiver=receiver, requester=self.request.user)


class ListFriendsView(ListAPIView):
    """
        This view should return a list of all the
        friends for the currently authenticated user.
    """

    def get_queryset(self):
        return self.request.user.friends

    serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]


class ListMyFriendRequestsView(ListAPIView):
    """
    This view should return a list of all the incoming
    friend requests for the currently authenticated user.
    """

    def get_queryset(self):
        user = self.request.user
        return FriendRequest.objects.filter(
            Q(receiver=user) | Q(requester=user))

    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]


class RetrieveUpdateDestroyFriendRequestView(RetrieveUpdateDestroyAPIView):
    queryset = FriendRequest.objects.all()
    lookup_field = 'id'
    serializer_class = FriendRequestSerializer

    def get_permissions(self):
        if self.request.method == 'GET' or self.request.method == 'DELETE':
            self.permission_classes = [IsRequesterOrReceiver]
        else:
            self.permission_classes = [IsReceiver]
        return super(RetrieveUpdateDestroyFriendRequestView, self).get_permissions()

    def patch(self, request, *args, **kwargs):
        if self.queryset.get(id=self.kwargs["id"]).status == 'P':
            if request.data['status'] == 'A':
                self.queryset.get(id=self.kwargs["id"]).receiver.friends.add(self.queryset.get(id=self.kwargs["id"]).requester)
                self.queryset.get(id=self.kwargs["id"]).receiver.save()
            if request.data['status'] == 'R':
                self.queryset.get(id=self.kwargs["id"]).receiver.rejected.add(self.queryset.get(id=self.kwargs["id"]).requester)
                self.queryset.get(id=self.kwargs["id"]).receiver.save()
            return self.partial_update(request, *args, **kwargs)
        else:
            return Response({"detail": "You can only change pending requests!"})
