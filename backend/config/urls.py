from django.contrib import admin
from django.urls import path, include, re_path
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve


def home(request):
    return JsonResponse({"status": "OK", "message": "JobDhundho API running"})


urlpatterns = [
    path("", home),
    path("admin/", admin.site.urls),

    path("api/accounts/", include("apps.accounts.urls")),
    path("api/jobs/", include("apps.jobs.urls")),
    path("api/applications/", include("apps.applications.urls")),
    path("api/companies/", include("apps.companies.urls")),
]

# ===============================
# MEDIA FILES (IMPORTANT FIX)
# ===============================

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += [
        re_path(
            r'^media/(?P<path>.*)$',
            serve,
            {'document_root': settings.MEDIA_ROOT}
        ),
    ]
