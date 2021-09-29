from rest_framework import serializers

from post.models import Post
from post.serializers.nested import NestedUserSerializer


class CreatePostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'
        read_only_field = ['user']


class PostSerializer(serializers.ModelSerializer):
    user = NestedUserSerializer()
    liked = NestedUserSerializer(many=True)

    class Meta:
        model = Post
        fields = '__all__'
