from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from django.shortcuts import get_object_or_404

from .models import Application
from .serializers import ApplicationSerializer
from apps.jobs.models import Job

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# ============================================
# APPLY FOR JOB (MULTIPLE APPLICATIONS ALLOWED)
# ============================================
class ApplyJobView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        job_id = request.data.get("job")

        if not job_id:
            return Response(
                {"message": "Job ID is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        job = get_object_or_404(Job, id=job_id)

        serializer = self.get_serializer(
            data=request.data,
            context={"request": request}
        )

        serializer.is_valid(raise_exception=True)

        # ✅ NOW ALLOWS MULTIPLE APPLICATIONS
        serializer.save(
            applicant=request.user,
            job=job
        )

        return Response(
            {
                "message": "Application submitted successfully! 🎉",
                "application": serializer.data
            },
            status=status.HTTP_201_CREATED
        )

# ============================================
# COMPANY APPLICATION LIST
# ============================================
class CompanyApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

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
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):

        application = Application.objects.filter(
            pk=pk,
            job__company__created_by=request.user
        ).first()

        if not application:
            return Response(
                {"message": "Application not found or access denied."},
                status=status.HTTP_404_NOT_FOUND
            )

        status_value = request.data.get("status")

        if status_value not in ["Accepted", "Rejected"]:
            return Response(
                {"message": "Invalid status value."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ✅ Update status
        application.status = status_value
        application.save()

        # ======================================
        # PROFESSIONAL EMAIL TEMPLATE (SAFE)
        # ======================================
        try:
            subject = f"{application.job.company.name} - Application Update"

            if status_value == "Accepted":
                email_body = f"""
Dear {application.full_name},

🎉 Congratulations!

We are pleased to inform you that your application for:

{application.job.title}

at {application.job.company.name} has been ACCEPTED.

Our hiring team will contact you shortly with the next steps.

Thank you for your interest in joining our organization.

Best regards,
{application.job.company.name}
Hiring Team
"""
            else:
                email_body = f"""
Dear {application.full_name},

Thank you for applying for:

{application.job.title}

at {application.job.company.name}.

After careful consideration, we regret to inform you that you have not been selected this time.

We truly appreciate your effort and encourage you to apply again in the future.

We wish you success in your career journey.

Kind regards,
{application.job.company.name}
Hiring Team
"""

            message = Mail(
                from_email=settings.DEFAULT_FROM_EMAIL,
                to_emails=application.email,
                subject=subject,
                plain_text_content=email_body,
            )

            # Only send if API key exists
            if getattr(settings, "SENDGRID_API_KEY", None):
                sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
                sg.send(message)

        except Exception as e:
            # ❗ Never crash if email fails
            print("Email sending failed but status updated:", str(e))

        return Response(
            {
                "message": f"Application {status_value} successfully.",
                "status": status_value
            },
            status=status.HTTP_200_OK
        )


# ============================================
# COMPANY ANALYTICS
# ============================================
class CompanyAnalyticsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

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


# ============================================
# MY APPLICATIONS (APPLICANT)
# ============================================
class MyApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(
            applicant=self.request.user
        ).order_by("-applied_at")

    def get_serializer_context(self):
        return {"request": self.request}
