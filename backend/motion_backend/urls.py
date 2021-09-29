"""motion_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt import views as jwt_views

schema_view = get_schema_view(
    openapi.Info(
        title="RCM API",
        default_version='v1.0',
        description="Recipe and cookbook management API",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="catalin.barcan@ymail.com"),
        license=openapi.License(name="ACB License"),
    ),
    public=True,  # Set to False restrict access to protected endpoints
    permission_classes=(permissions.AllowAny,),  # Permissions for docs access
)

urlpatterns = [
                  path(
                      'backend/admin/',
                      admin.site.urls
                  ),
                  path(
                      'backend/api/social/posts/',
                      include("post.urls")
                  ),
                  path(
                      'backend/api/social/comments/',
                      include("comment.urls")
                  ),
                  path(
                      'backend/api/users/',
                      include("user.urls.user_urls")
                  ),
                  path(
                      'backend/api/social/followers/',
                      include('user.urls.followers_urls')
                  ),
                  path(
                      'backend/api/social/friends/',
                      include('friend_request.urls')
                  ),
                  path(
                      'backend/api/auth/',
                      include('registration.urls')
                  ),
                  path(
                      'backend/api/auth/token/',
                      jwt_views.TokenObtainPairView.as_view(),
                      name='token_obtain_pair'
                  ),
                  path(
                      'backend/api/auth/token/refresh/',
                      jwt_views.TokenRefreshView.as_view(),
                      name='token_refresh'
                  ),
                  path(
                      'backend/api/auth/token/verify/',
                      jwt_views.TokenVerifyView.as_view(),
                      name='token_refresh'
                  ),
                  path(
                      'backend/api/docs/',
                      schema_view.with_ui('swagger', cache_timeout=0),
                      name='schema-swagger-ui'),
              ] + static(settings.STATIC_URL,
                         document_root=settings.STATIC_ROOT) \
              + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
