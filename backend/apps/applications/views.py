from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.conf import settings

from .models import Application
from .serializers import ApplicationSerializer
from apps.jobs.models import Job
from apps.accounts.permissions import IsCompany  # ✅ Correct import

# ✅ SendGrid API
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


# ============================================
# APPLY FOR JOB (ONLY NORMAL USERS)
# ============================================
class ApplyJobView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]  # ✅ normal users apply

    def create(self, request, *args, **kwargs):
        job_id = request.data.get("job")

        if not job_id:
            return Response({"error": "Job ID required"}, status=400)

        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"error": "Job does not exist"}, status=400)

        # ✅ DUPLICATE APPLICATION CHECK
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

        serializer.save(
            applicant=request.user,
            job=job
        )

        return Response(serializer.data, status=201)


# ============================================
# COMPANY APPLICATION LIST (ONLY COMPANY)
# ============================================
class CompanyApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsCompany]  # ✅ only companies

    def get_queryset(self):
        return Application.objects.filter(
            job__company__created_by=self.request.user
        ).order_by("-applied_at")

    def get_serializer_context(self):
        return {"request": self.request}


# ============================================
# UPDATE STATUS (ONLY COMPANY)
# ============================================
class UpdateApplicationStatusView(generics.UpdateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsCompany]  # ✅ only companies

    def get_queryset(self):
        return Application.objects.filter(
            job__company__created_by=self.request.user
        )

    def update(self, request, *args, **kwargs):
        application = self.get_object()
        status_value = request.data.get("status")

        if status_value not in ["Accepted", "Rejected"]:
            raise ValidationError({"status": "Invalid status"})

        # ✅ Update Status
        application.status = status_value
        application.save()

        # ==========================
        # SEND EMAIL USING SENDGRID API
        # ==========================
        subject = f"Application {status_value} - {application.job.title}"

        if status_value == "Accepted":
            email_body = f"""
Dear {application.full_name},

Congratulations! 🎉

We are pleased to inform you that your application for the position
"{application.job.title}" at {application.job.company.name} has been ACCEPTED.

Our team will contact you soon with further details.

Best regards,
{application.job.company.name}
Hiring Team
"""
        else:
            email_body = f"""
Dear {application.full_name},

Thank you for applying for the position
"{application.job.title}" at {application.job.company.name}.

After careful consideration, we regret to inform you that your application
has not been selected this time.

We appreciate your interest and encourage you to apply for future opportunities.

Best regards,
{application.job.company.name}
Hiring Team
"""

        try:
            message = Mail(
                from_email=settings.DEFAULT_FROM_EMAIL,
                to_emails=application.email,
                subject=subject,
                plain_text_content=email_body,
            )

            sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
            sg.send(message)

        except Exception as e:
            print("SendGrid error:", str(e))

        return Response({"message": f"Application {status_value} successfully"})


# ============================================
# COMPANY ANALYTICS (ONLY COMPANY)
# ============================================
class CompanyAnalyticsView(APIView):
    permission_classes = [IsCompany]  # ✅ only companies

    def get(self, request):
        jobs = Job.objects.filter(created_by=request.user)
        total_jobs = jobs.count()

        applications = Application.objects.filter(
            job__created_by=request.user
        )

        total_applications = applications.count()
        pending = applications.filter(status="Pending").count()
        accepted = applications.filter(status="Accepted").count()
        rejected = applications.filter(status="Rejected").count()

        return Response({
            "total_jobs": total_jobs,
            "total_applications": total_applications,
            "pending": pending,
            "accepted": accepted,
            "rejected": rejected
        })
