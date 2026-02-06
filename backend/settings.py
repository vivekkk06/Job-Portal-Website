from decouple import config

# ==============================
# SENDGRID EMAIL CONFIG
# ==============================

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

EMAIL_HOST = "smtp.sendgrid.net"
EMAIL_PORT = 587
EMAIL_USE_TLS = True

EMAIL_HOST_USER = "apikey"
EMAIL_HOST_PASSWORD = config("SENDGRID_API_KEY")


DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL")
