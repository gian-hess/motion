from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.generics import ListAPIView, RetrieveAPIView, \
    GenericAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from motion_backend.permissions import IsOwnerOrReadOnly
from user.serializers import ListUserSerializer

User = get_user_model()


class UserList(ListAPIView):
    serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = User.objects.all()
        search = self.request.query_params.get('search')
        if search is not None:
            queryset = queryset.filter(Q(first_name__contains=search) | Q(last_name__contains=search))
        return queryset


class ToggleFollow(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        follower = request.user
        following = User.objects.get(id=kwargs["pk"])
        if follower == following:
            return Response(
                {"detail": "Users cannot do this operation with themselves."})
        else:
            if following in User.objects.filter(
                    followers=self.request.user.id):
                follower.following.remove(following)
                follower.save()
                serializer = self.get_serializer(following)
                return Response(serializer.data)
            else:
                follower.following.add(following)
                follower.save()
                serializer = self.get_serializer(following)
                return Response(serializer.data)


class FollowersList(ListAPIView):
    def get_queryset(self):
        return User.objects.filter(following=self.request.user.id)

    serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]


class FollowingList(ListAPIView):
    def get_queryset(self):
        return User.objects.filter(followers=self.request.user.id)

    serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]


class RetrieveUpdateDestroyMyUserView(RetrieveUpdateDestroyAPIView):
    serializer_class = ListUserSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        if "things_user_likes" in self.request.data:
            things_user_likes = self.request.data["things_user_likes"][1: len(self.request.data["things_user_likes"]) - 1]
            serializer.save(things_user_likes=things_user_likes)
        else:
            serializer.save()


class RetrieveUserView(RetrieveAPIView):
    queryset = User.objects.all()
    lookup_field = 'pk'
    serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]
