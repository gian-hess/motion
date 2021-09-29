from rest_framework import serializers

from comment.models import Comment
from post.serializers.nested import NestedUserSerializer


class CreateCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_field = ['user', 'post']


class CommentSerializer(serializers.ModelSerializer):
    user = NestedUserSerializer()

    class Meta:
        model = Comment
        fields = '__all__'
