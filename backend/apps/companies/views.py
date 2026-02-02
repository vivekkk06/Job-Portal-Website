from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from .models import Company
from .serializers import CompanySerializer


class CompanyCreateView(generics.CreateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):

        # Prevent multiple companies per user
        if Company.objects.filter(created_by=self.request.user).exists():
            raise ValidationError("You already created a company.")

        serializer.save(created_by=self.request.user)
from rest_framework.response import Response

class MyCompanyView(generics.RetrieveAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        try:
            return Company.objects.get(created_by=self.request.user)
        except Company.DoesNotExist:
            return None

    def retrieve(self, request, *args, **kwargs):
        company = self.get_object()
        if not company:
            return Response({"exists": False})
        serializer = self.get_serializer(company)
        return Response({"exists": True, "company": serializer.data})
