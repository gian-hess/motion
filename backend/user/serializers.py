from django.contrib.auth import get_user_model
from rest_framework import serializers

from friend_request.models import FriendRequest

User = get_user_model()


class ListUserSerializer(serializers.ModelSerializer):
    # overrides the things_user_likes field so that it is shown as a list
    things_user_likes = serializers.SerializerMethodField()

    logged_in_user_is_following = serializers.SerializerMethodField()
    logged_in_user_is_friends = serializers.SerializerMethodField()
    logged_in_user_is_rejected = serializers.SerializerMethodField()
    logged_in_user_received_fr = serializers.SerializerMethodField()
    logged_in_user_sent_fr = serializers.SerializerMethodField()
    amount_of_posts = serializers.SerializerMethodField()
    amount_of_likes = serializers.SerializerMethodField()
    amount_of_friends = serializers.SerializerMethodField()
    amount_of_followers = serializers.SerializerMethodField()
    amount_following = serializers.SerializerMethodField()

    def get_things_user_likes(self, obj):
        if obj.things_user_likes:
            return list(obj.things_user_likes.split(", "))
        else:
            return []

    def get_logged_in_user_is_following(self, obj):
        if obj in User.objects.filter(followers=self.context["request"].user.id):
            return True
        else:
            return False

    def get_logged_in_user_is_friends(self, obj):
        if obj in User.objects.filter(friends=self.context["request"].user.id):
            return True
        else:
            return False

    def get_logged_in_user_is_rejected(self, obj):
        if obj in User.objects.filter(rejected=self.context["request"].user.id):
            return True
        else:
            return False

    def get_logged_in_user_received_fr(self, obj):
        if obj in [elem.requester for elem in FriendRequest.objects.filter(receiver=self.context["request"].user.id)]:
            return True
        else:
            return False

    def get_logged_in_user_sent_fr(self, obj):
        if obj in [elem.receiver for elem in FriendRequest.objects.filter(requester=self.context["request"].user.id)]:
            return True
        else:
            return False

    def get_amount_of_posts(self, obj):
        return obj.Posts.all().count()

    def get_amount_of_likes(self, obj):
        return obj.liked_Posts.all().count()

    def get_amount_of_friends(self, obj):
        return obj.friends.all().count()

    def get_amount_of_followers(self, obj):
        return obj.followers.all().count()

    def get_amount_following(self, obj):
        return obj.following.all().count()

    class Meta:
        model = User

        # fields when reading an instance
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "about_me",
            "location",
            "job",
            "avatar",
            "banner",
            "things_user_likes",
            "logged_in_user_is_following",
            "logged_in_user_is_friends",
            "logged_in_user_is_rejected",
            "logged_in_user_received_fr",
            "logged_in_user_sent_fr",
            "amount_of_posts",
            "amount_of_likes",
            "amount_of_friends",
            "amount_of_followers",
            "amount_following"
            # "followers",
            # "following"
        ]
