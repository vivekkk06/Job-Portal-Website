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
# EMAIL SENDER FUNCTION (Reusable + Safe)
# ======================================================
def send_otp_via_sendgrid(email, otp):
    if not hasattr(settings, "SENDGRID_API_KEY"):
        raise Exception("SENDGRID_API_KEY not configured in settings")

    url = "https://api.sendgrid.com/v3/mail/send"

    headers = {
        "Authorization": f"Bearer {settings.SENDGRID_API_KEY}",
        "Content-Type": "application/json",
    }

    data = {
        "personalizations": [
            {
                "to": [{"email": email}],
                "subject": "Your JobDhundho Verification Code",
            }
        ],
        "from": {
            "email": settings.DEFAULT_FROM_EMAIL,
            "name": "JobDhundho Team"
        },
        "reply_to": {
            "email": settings.DEFAULT_FROM_EMAIL,
            "name": "JobDhundho Support"
        },
        "content": [
            {
                "type": "text/plain",
                "value": f"""
Hello,

Your JobDhundho verification code is: {otp}

This code will expire in 10 minutes.

If you did not request this email, please ignore it.

Regards,
JobDhundho Team
"""
            },
            {
                "type": "text/html",
                "value": f"""
<html>
  <body style="font-family:Arial, sans-serif; padding:20px;">
    <h2>Welcome to JobDhundho 👋</h2>
    <p>Your verification code is:</p>
    <h1 style="color:#2563eb;">{otp}</h1>
    <p>This code will expire in 10 minutes.</p>
    <hr>
    <p style="font-size:12px; color:gray;">
      If you did not request this email, you can safely ignore it.
    </p>
  </body>
</html>
"""
            }
        ],
    }

    response = requests.post(url, headers=headers, json=data, timeout=10)

    print("SendGrid status:", response.status_code)
    print("SendGrid response:", response.text)

    if response.status_code != 202:
        raise Exception(response.text)


# ======================================================
# START REGISTER
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
            user = User.objects.create(
                email=email,
                username=f"user_{random.randint(100000,999999)}",
                is_active=False,
                is_verified=False
            )

        user.otp = otp
        user.save()

        try:
            send_otp_via_sendgrid(user.email, otp)
        except Exception as e:
            print("Email sending failed:", str(e))
            return Response({"error": "Failed to send OTP"}, status=500)

        return Response({"message": "OTP sent successfully"})


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

        try:
            send_otp_via_sendgrid(email, otp)
        except Exception as e:
            print("Email resend failed:", str(e))
            return Response({"error": "Failed to resend OTP"}, status=500)

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
