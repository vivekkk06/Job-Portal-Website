from django.db import models
from django.conf import settings
from apps.companies.models import Company

User = settings.AUTH_USER_MODEL


class Job(models.Model):

    JOB_TYPES = [
        ("Full Time", "Full Time"),
        ("Part Time", "Part Time"),
        ("Internship", "Internship"),
        ("Remote", "Remote"),
    ]

    title = models.CharField(max_length=200)

    # Each job belongs to a company
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="jobs"
    )

    # User who created the job (company owner)
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="posted_jobs"
    )

    location = models.CharField(max_length=150)
    job_type = models.CharField(max_length=50, choices=JOB_TYPES)

    description = models.TextField()
    salary = models.CharField(max_length=100, blank=True, null=True)

    is_active = models.BooleanField(default=True)  # 🔥 important for hiding deleted jobs

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} - {self.company.name}"
