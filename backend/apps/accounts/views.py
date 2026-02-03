from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
import random
import requests

from .models import User
from .serializers import UserSerializer, EmailOrUsernameTokenSerializer


# ======================================================
# START REGISTER (SEND OTP)
# ======================================================
class StartRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response({"error": "Email is required"}, status=400)

        if User.objects.filter(email=email, is_active=True).exists():
            return Response({"error": "Email already registered"}, status=400)

        otp = random.randint(100000, 999999)

        user = User.objects.filter(email=email).first()

        if not user:
            temp_username = f"user_{random.randint(100000,999999)}"
            user = User.objects.create(
                email=email,
                username=temp_username,
                is_active=False,
                is_verified=False
            )

        user.otp = otp
        user.save()

        self.send_otp_email(user.email, otp)

        return Response({"message": "OTP sent successfully"})

    def send_otp_email(self, email, otp):
        url = "https://api.sendgrid.com/v3/mail/send"

        headers = {
            "Authorization": f"Bearer {settings.SENDGRID_API_KEY}",
            "Content-Type": "application/json",
        }

        data = {
            "personalizations": [
                {
                    "to": [{"email": email}],
                    "subject": "Verify Your Email - JobDhundho",
                }
            ],
            "from": {
                "email": settings.DEFAULT_FROM_EMAIL
            },
            "content": [
                {
                    "type": "text/html",
                    "value": f"""
                        <div style="font-family: Arial, sans-serif; padding:20px;">
                            <h2>Welcome to JobDhundho 👋</h2>
                            <p>Your verification code is:</p>
                            <h1 style="color:#2563eb;">{otp}</h1>
                            <p>This code will expire in 10 minutes.</p>
                            <br>
                            <p>Thanks,<br>JobDhundho Team</p>
                        </div>
                    """
                }
            ],
        }

        response = requests.post(url, headers=headers, json=data)

        if response.status_code != 202:
            raise Exception(f"SendGrid Error: {response.text}")


# ======================================================
# RESEND OTP
# ======================================================
class ResendOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response({"error": "Email is required"}, status=400)

        user = User.objects.filter(email=email, is_active=False).first()

        if not user:
            return Response({"error": "User not found or already active"}, status=400)

        otp = random.randint(100000, 999999)
        user.otp = otp
        user.save()

        StartRegisterView().send_otp_email(email, otp)

        return Response({"message": "OTP resent successfully"})


# ======================================================
# VERIFY EMAIL
# ======================================================
class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        if not email or not otp:
            return Response({"error": "Email and OTP required"}, status=400)

        user = User.objects.filter(email=email, otp=otp).first()

        if not user:
            return Response({"error": "Invalid OTP"}, status=400)

        user.otp = None
        user.is_verified = True
        user.save()

        return Response({"message": "Email verified successfully"})


# ======================================================
# COMPLETE REGISTER
# ======================================================
class CompleteRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        username = request.data.get("username")
        password = request.data.get("password")

        if not email or not username or not password:
            return Response({"error": "All fields are required"}, status=400)

        user = User.objects.filter(
            email=email,
            is_verified=True,
            is_active=False
        ).first()

        if not user:
            return Response({"error": "Verify email first"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=400)

        user.username = username
        user.set_password(password)
        user.is_active = True
        user.save()

        return Response({"message": "Account created successfully"})


# ======================================================
# LOGIN
# ======================================================
class EmailOrUsernameTokenView(TokenObtainPairView):
    serializer_class = EmailOrUsernameTokenSerializer


# ======================================================
# CURRENT USER
# ======================================================
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
