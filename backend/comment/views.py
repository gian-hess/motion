from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated

from comment.models import Comment
from comment.serializers import CreateCommentSerializer, CommentSerializer
from post.models import Post


class ListCreateCommentView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Comment.objects.filter(post=self.kwargs['pk'])
        return queryset

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateCommentSerializer
        return CommentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, post=Post.objects.get(id=self.kwargs['pk']))
