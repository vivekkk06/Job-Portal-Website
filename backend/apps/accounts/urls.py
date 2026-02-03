from django.urls import path
from .views import (
    StartRegisterView,
    ResendOTPView,
    VerifyEmailView,
    CompleteRegisterView,
    EmailOrUsernameTokenView,
    MeView,
)

urlpatterns = [
    path("start-register/", StartRegisterView.as_view()),
    path("resend-otp/", ResendOTPView.as_view()),
    path("verify-email/", VerifyEmailView.as_view()),
    path("complete-register/", CompleteRegisterView.as_view()),
    path("login/", EmailOrUsernameTokenView.as_view()),
    path("me/", MeView.as_view()),
]
