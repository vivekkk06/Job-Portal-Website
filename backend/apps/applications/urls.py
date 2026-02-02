from django.urls import path
from .views import (
    ApplyJobView,
    CompanyApplicationsView,
    UpdateApplicationStatusView
)
from .views import CompanyAnalyticsView

urlpatterns = [
    path("apply/", ApplyJobView.as_view(), name="apply-job"),
    path("company/", CompanyApplicationsView.as_view(), name="company-applications"),
    path("analytics/", CompanyAnalyticsView.as_view(), name="company-analytics"),
    path("<int:pk>/update/", UpdateApplicationStatusView.as_view(), name="update-application"),
]
