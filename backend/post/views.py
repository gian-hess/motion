from rest_framework import status
from rest_framework.response import Response

from motion_backend.permissions import IsOwnerOrReadOnly
from .models import Post
from rest_framework.generics import ListCreateAPIView, \
    RetrieveUpdateDestroyAPIView, \
    UpdateAPIView, ListAPIView
from post.serializers.serializers import CreatePostSerializer, PostSerializer
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model

User = get_user_model()


class ListCreatePostView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Post.objects.all()
        search = self.request.query_params.get('search')
        if search is not None:
            queryset = queryset.filter(content__contains=search)
        return queryset

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreatePostSerializer
        return PostSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class GetUpdateDeletePostView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = PostSerializer
    lookup_field = 'id'


class ToggleLikes(UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def post(self, request, *args, **kwargs):
        post = self.get_object()
        user = self.request.user

        if user in post.liked.all():
            post.liked.remove(user)
            return Response({'success': 'unliked'}, status=status.HTTP_200_OK)
        else:
            post.liked.add(user)
            return Response({'success': 'liked'}, status=status.HTTP_200_OK)


class ListUserLikedPosts(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return self.request.user.liked_Posts


class ListUserFollowingPosts(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(user__in=User.objects.filter(
            followers=self.request.user.id))


class ListFriendsPosts(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(user__in=self.request.user.friends.values("id"))


class ListUserPosts(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(user_id=self.kwargs['id'])
