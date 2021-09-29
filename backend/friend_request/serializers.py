from rest_framework import serializers
from friend_request.models import FriendRequest
from django.contrib.auth import get_user_model

User = get_user_model()


class CreateFriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'
        read_only_fields = ['receiver', 'requester']


class FriendRequestSerializer(serializers.ModelSerializer):
    receiver_name = serializers.SerializerMethodField()
    requester_name = serializers.SerializerMethodField()

    @staticmethod
    def get_receiver_name(obj):
        return obj.receiver.username

    @staticmethod
    def get_requester_name(obj):
        return obj.requester.username

    class Meta:
        model = FriendRequest
        fields = [
            "id",
            "status",
            "receiver",
            "receiver_name",
            "requester",
            "requester_name"
        ]
