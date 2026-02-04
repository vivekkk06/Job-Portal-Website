from rest_framework import serializers
from .models import Application

class ApplicationSerializer(serializers.ModelSerializer):
    resume_url = serializers.SerializerMethodField()
    job_title = serializers.CharField(source="job.title", read_only=True)

    class Meta:
        model = Application
        fields = "__all__"

    def get_resume_url(self, obj):
        request = self.context.get("request")
        if obj.resume and request:
            return request.build_absolute_uri(obj.resume.url)
        return None
