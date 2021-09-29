from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.user == request.user


class IsReceiver(BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.receiver == request.user


class IsRequesterOrReceiver(BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.receiver == request.user or obj.requester == request.user
