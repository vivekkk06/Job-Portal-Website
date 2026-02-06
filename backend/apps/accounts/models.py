from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = (
        ("user", "User"),
        ("company", "Company"),
    )

    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=6, null=True, blank=True)
    is_verified = models.BooleanField(default=False)

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="user"
    )

    def __str__(self):
        return self.username
