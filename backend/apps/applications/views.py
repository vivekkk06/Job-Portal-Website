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
# APPLY FOR JOB
# ============================================
class ApplyJobView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        job_id = request.data.get("job")

        if not job_id:
            return Response({"error": "Job ID required"}, status=400)

        job = get_object_or_404(Job, id=job_id)

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
                {"error": "Application not found or not allowed"},
                status=status.HTTP_404_NOT_FOUND
            )

        status_value = request.data.get("status")

        if status_value not in ["Accepted", "Rejected"]:
            return Response(
                {"error": "Invalid status"},
                status=status.HTTP_400_BAD_REQUEST
            )

        application.status = status_value
        application.save()

        # ======================================
        # PROFESSIONAL EMAIL TEMPLATE
        # ======================================
        try:
            subject = f"{application.job.company.name} - Application Update ({status_value})"

            if status_value == "Accepted":
                email_body = f"""
Dear {application.full_name},

🎉 Congratulations!

We are pleased to inform you that your application for the position:

    {application.job.title}

at {application.job.company.name} has been ACCEPTED.

Our hiring team will reach out to you shortly with the next steps in the recruitment process.

We appreciate the time and effort you put into your application and look forward to connecting with you.

Warm regards,  
{application.job.company.name}  
Hiring Team
"""
            else:
                email_body = f"""
Dear {application.full_name},

Thank you for your interest in the position:

    {application.job.title}

at {application.job.company.name}.

After careful consideration, we regret to inform you that your application has not been selected on this occasion.

Please do not be discouraged. We truly appreciate your effort and encourage you to apply for future opportunities with us.

We wish you the very best in your career journey.

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

            sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
            sg.send(message)

        except Exception as e:
            print("Email error (status updated successfully):", str(e))

        return Response(
            {
                "message": f"Application {status_value} successfully",
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
