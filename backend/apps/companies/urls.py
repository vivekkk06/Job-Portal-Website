from django.urls import path
from .views import CompanyCreateView, MyCompanyView

urlpatterns = [
    path("create/", CompanyCreateView.as_view()),
    path("my-company/", MyCompanyView.as_view()),
]
