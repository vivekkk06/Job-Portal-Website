from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.permissions import BasePermission

from .models import Job
from .serializers import JobSerializer
from apps.companies.models import Company


# 🔐 Custom permission (Only job owner can edit/delete)
class IsJobOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.created_by == request.user


# ============================================
# 1️⃣ List All Jobs (Public) + Create Job
# ============================================
class JobListCreateView(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # Visible to everyone
        return Job.objects.all().order_by("-created_at")

    def perform_create(self, serializer):
        # Only company owner can post job
        try:
            company = Company.objects.get(created_by=self.request.user)
        except Company.DoesNotExist:
            raise ValidationError("Create company profile first")

        serializer.save(
            created_by=self.request.user,
            company=company
        )


# ============================================
# 2️⃣ Job Detail (Public View)
# ============================================
class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]


# ============================================
# 3️⃣ My Posted Jobs (Company Only)
# ============================================
class MyJobsView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(
            created_by=self.request.user
        ).order_by("-created_at")


# ============================================
# 4️⃣ Delete Job (Only Owner)
# ============================================
class DeleteJobView(generics.DestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated, IsJobOwner]
