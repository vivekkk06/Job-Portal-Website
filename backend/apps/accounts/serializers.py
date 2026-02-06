from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


# ======================================================
# USER SERIALIZER
# ======================================================
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "role",
            "date_joined",
        ]
        read_only_fields = ["id", "date_joined"]


# ======================================================
# LOGIN WITH EMAIL OR USERNAME
# ======================================================
class EmailOrUsernameTokenSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        login = attrs.get("username")
        password = attrs.get("password")

        if not login or not password:
            raise serializers.ValidationError("Username/Email and password required")

        # Allow login via email OR username
        user = (
            User.objects.filter(email__iexact=login).first()
            or User.objects.filter(username__iexact=login).first()
        )

        if not user:
            raise serializers.ValidationError("User not found")

        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password")

        if not user.is_active:
            raise serializers.ValidationError("Please verify your email first")

        # IMPORTANT: Use real username for JWT generation
        data = super().validate({
            "username": user.username,
            "password": password
        })

        # OPTIONAL: Add extra user info in login response
        data["user"] = {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "role": user.role,
        }

        return data
