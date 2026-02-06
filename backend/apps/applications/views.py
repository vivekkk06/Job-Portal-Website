from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.shortcuts import get_object_or_404

from .models import Application
from .serializers import ApplicationSerializer
from apps.jobs.models import Job
from apps.accounts.permissions import IsCompany

# ✅ SendGrid
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


# ============================================
# APPLY FOR JOB (ONLY NORMAL USERS)
# ============================================
class ApplyJobView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        job_id = request.data.get("job")

        if not job_id:
            return Response({"error": "Job ID required"}, status=400)

        job = get_object_or_404(Job, id=job_id)

        # ✅ Prevent duplicate apply
        if Application.objects.filter(job=job, applicant=request.user).exists():
            return Response(
                {"error": "You already applied to this job"},
                status=400
            )

        serializer = self.get_serializer(
            data=request.data,
            context={"request": request}
        )

        serializer.is_valid(raise_exception=True)
        serializer.save(applicant=request.user, job=job)

        return Response(serializer.data, status=201)


# ============================================
# COMPANY APPLICATION LIST
# ============================================
class CompanyApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(
            job__company__created_by=self.request.user
        ).order_by("-applied_at")

    def get_serializer_context(self):
        return {"request": self.request}


# ============================================
# UPDATE STATUS (ACCEPT / REJECT)
# ============================================
class UpdateApplicationStatusView(APIView):
    permission_classes = [IsCompany]

    def patch(self, request, pk):
        try:
            application = Application.objects.get(
                pk=pk,
                job__company__created_by=request.user
            )
        except Application.DoesNotExist:
            return Response(
                {"error": "Application not found"},
                status=404
            )

        status_value = request.data.get("status")

        if status_value not in ["Accepted", "Rejected"]:
            raise ValidationError({"status": "Invalid status"})

        # ✅ Update safely
        application.status = status_value
        application.save()

        # ==========================
        # SEND EMAIL (SAFE VERSION)
        # ==========================
        try:
            subject = f"Application {status_value} - {application.job.title}"

            if status_value == "Accepted":
                email_body = f"""
Dear {application.full_name},

Congratulations! 🎉

Your application for "{application.job.title}"
at {application.job.company.name} has been ACCEPTED.

We will contact you soon.

Best regards,
{application.job.company.name}
"""
            else:
                email_body = f"""
Dear {application.full_name},

Thank you for applying for "{application.job.title}"
at {application.job.company.name}.

We regret to inform you that your application
was not selected this time.

Best regards,
{application.job.company.name}
"""

            message = Mail(
                from_email=settings.DEFAULT_FROM_EMAIL,
                to_emails=application.email,
                subject=subject,
                plain_text_content=email_body,
            )

            sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
            sg.send(message)

        except Exception as e:
            print("⚠️ Email failed but status updated:", str(e))

        return Response(
            {"message": f"Application {status_value} successfully"},
            status=status.HTTP_200_OK
        )

# ============================================
# COMPANY ANALYTICS
# ============================================
class CompanyAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            jobs = Job.objects.filter(company__created_by=request.user)

            applications = Application.objects.filter(
                job__company__created_by=request.user
            )

            return Response({
                "total_jobs": jobs.count(),
                "total_applications": applications.count(),
                "pending": applications.filter(status="Pending").count(),
                "accepted": applications.filter(status="Accepted").count(),
                "rejected": applications.filter(status="Rejected").count(),
            })

        except Exception as e:
            print("Analytics backend error:", str(e))
            return Response({
                "total_jobs": 0,
                "total_applications": 0,
                "pending": 0,
                "accepted": 0,
                "rejected": 0,
            })

class MyApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(
            applicant=self.request.user
        ).order_by("-applied_at")
