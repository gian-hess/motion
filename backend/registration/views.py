from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.http import HttpResponse
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.response import Response

from registration.models import Registration, code_generator
from registration.serializers import RegistrationSerializer, ValidationSerializer
from motion_backend.settings import DEFAULT_FROM_EMAIL

User = get_user_model()


class RegistrationView(CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        new_user = User(email=request.data['email'], username=request.data['email'], is_active=False)
        new_user.save()
        new_registration = Registration(user=new_user)
        new_registration.save()
        send_mail(
            'Thank you for signing up for Motion!',
            f'Here is your e-mail validation code: {new_registration.code}. You will need it to create a new profile.',
            DEFAULT_FROM_EMAIL,
            [request.data['email']],
            fail_silently=False,
        )
        return HttpResponse(status=201)


class ValidationView(UpdateAPIView):
    serializer_class = ValidationSerializer
    permission_classes = []

    def get_object(self):
        return User.objects.get(email=self.request.data['email'])

    def patch(self, request, *args, **kwargs):
        if request.data['email'] in [elem.email for elem in User.objects.all()]:
            if User.objects.get(email=request.data['email']).registration.code == request.data['code']:
                user = self.get_object()
                user.username = request.data['username']
                if request.data['password'] == request.data['password_confirmation']:
                    user.set_password(request.data['password'])
                else:
                    return Response({'detail': 'password did not match'}, status=404)
                if request.data['first_name']:
                    user.first_name = request.data['first_name']
                if request.data['last_name']:
                    user.last_name = request.data['last_name']
                user.is_active = True
                user.save()
                registration = user.registration
                registration.is_used = True
                registration.save()
                serializer = self.get_serializer(user)
                return Response(serializer.data)
            else:
                return Response({'detail': 'code is not correct'}, status=404)
        else:
            return Response({'detail': 'email is not correct'}, status=404)


class PasswordResetView(CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        registration = User.objects.get(email=request.data['email']).registration
        registration.subject = "P"
        if registration.is_used:
            new_code = code_generator()
            registration.code = new_code
            registration.is_used = False
            registration.save()
            send_mail(
                'Motion password reset',
                f'Here is your password reset code: {new_code}. You will need it to change your password.',
                DEFAULT_FROM_EMAIL,
                [request.data['email']],
                fail_silently=False,
            )
        else:
            registration.save()
            send_mail(
                'Thank you for signing up for Motion!',
                f'Here is your e-mail validation code: {registration.code}. You will need it to create a new profile.',
                DEFAULT_FROM_EMAIL,
                [request.data['email']],
                fail_silently=False,
            )
        return HttpResponse(status=201)


class PasswordResetValidationView(UpdateAPIView):
    serializer_class = ValidationSerializer
    permission_classes = []

    def get_object(self):
        return User.objects.get(email=self.request.data['email'])

    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        if request.data['email'] == user.email:
            if user.registration.code == request.data['code'] and user.registration.is_used is False:
                if request.data['password'] == request.data['password_confirmation']:
                    user.set_password(request.data['password'])
                else:
                    return Response({'detail': 'password did not match'}, status=404)
                user.save()
                registration = user.registration
                registration.is_used = True
                registration.save()
                serializer = self.get_serializer(user)
                return Response(serializer.data)
            else:
                return Response({'detail': 'code is not correct'}, status=404)
        else:
            return Response({'detail': 'email is not correct'}, status=404)
