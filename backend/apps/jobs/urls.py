from django.urls import path
from .views import (
    JobListCreateView,
    JobDetailView,
    MyJobsView,
    DeleteJobView,
)

urlpatterns = [
    path("", JobListCreateView.as_view()),             # GET all / POST job
    path("<int:pk>/", JobDetailView.as_view()),        # GET single job
    path("my-jobs/", MyJobsView.as_view()),            # Company jobs
    path("<int:pk>/delete/", DeleteJobView.as_view()), # Delete job
]
