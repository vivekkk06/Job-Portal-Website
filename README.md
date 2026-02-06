============================================================ 🚀
JOBDHUNDHO – FULL STACK JOB PORTAL PLATFORM
============================================================

Live Application: https://jobdhundho-u9il.onrender.com

  --------------------
  📌 PROJECT SUMMARY
  --------------------

JobDhundho is a production-ready full-stack job portal web application
designed to connect job seekers and companies through a secure,
scalable, and modern web platform.

The system supports role-based authentication, job posting, job
applications, resume uploads, email notifications, analytics dashboards,
and secure JWT-based authentication.

This project demonstrates real-world backend architecture, API design,
frontend engineering, authentication flows, cloud integration, and
deployment.

  --------------------
  🛠 TECHNOLOGY STACK
  --------------------

Frontend: • React (Vite) • React Router • Axios • Tailwind CSS • Context
API (Global Auth State) • JWT Authentication Handling

Backend: • Django • Django REST Framework • Simple JWT • PostgreSQL
(Production Database) • Cloudinary (Resume Storage) • SendGrid (Email
Service) • Django Filters • WhiteNoise (Static Files)

Deployment: • Render (Backend + Frontend) • GitHub Version Control

  ------------------
  ✨ CORE FEATURES
  ------------------

🔐 Authentication System • Email OTP verification using SendGrid •
JWT-based login (email or username) • Secure token handling with refresh
tokens • Role-based users (Applicant / Company) • Profile editing
functionality

👨‍💼 Company Features • Create company profile • Post new jobs • Delete
jobs • View applications grouped by job • Accept / Reject applications •
Automatic email notification on status update • Company analytics
dashboard

👨‍🎓 Applicant Features • Browse available jobs • Search and filter jobs •
Apply with resume upload (Cloudinary) • Track application status •
Personal applicant dashboard

📊 Analytics • Total jobs • Total applications • Pending / Accepted /
Rejected statistics

📧 Email Integration • OTP email verification • Application accepted
email • Application rejected email • HTML + Plain text email support •
Secure API-based SendGrid integration

📂 Cloud File Handling • Resume upload to Cloudinary • Secure file URL
generation • Production-ready media storage

  -----------------------
  🏗 SYSTEM ARCHITECTURE
  -----------------------

React Frontend ↓ Django REST API ↓ PostgreSQL Database ↓ Cloudinary
(File Storage) ↓ SendGrid (Email Service)

  ----------------------
  📁 PROJECT STRUCTURE
  ----------------------

backend/ apps/ accounts/ companies/ jobs/ applications/ config/
settings.py urls.py

frontend/ src/ pages/ components/ layouts/ context/ api/

  ----------------------------
  🔑 IMPORTANT API ENDPOINTS
  ----------------------------

Authentication: POST /api/accounts/start-register/ POST
/api/accounts/verify-email/ POST /api/accounts/login/ GET
/api/accounts/me/ PATCH /api/accounts/me/

Jobs: GET /api/jobs/ POST /api/jobs/ GET /api/jobs/{id}/ DELETE
/api/jobs/{id}/delete/

Applications: POST /api/applications/apply/ GET
/api/applications/company/ PATCH /api/applications/{id}/update/ GET
/api/applications/analytics/ GET /api/applications/my/

  -----------------------
  🚀 HOW TO RUN LOCALLY
  -----------------------

Backend:

cd backend python -m venv venv venv(Windows) pip install -r
requirements.txt python manage.py migrate python manage.py runserver

Frontend:

cd frontend npm install npm run dev

  --------------------------
  🔐 ENVIRONMENT VARIABLES
  --------------------------

Backend (.env):

SECRET_KEY= DEBUG= DATABASE_URL= SENDGRID_API_KEY= DEFAULT_FROM_EMAIL=
CLOUDINARY_CLOUD_NAME= CLOUDINARY_API_KEY= CLOUDINARY_API_SECRET=

Frontend (.env):

VITE_API_URL=backend-url
  ----------------------
  📈 RESUME HIGHLIGHTS
  ----------------------

• Built scalable REST APIs using Django REST Framework • Implemented JWT
authentication with email OTP verification • Integrated third-party APIs
(SendGrid, Cloudinary) • Designed responsive UI using React + Tailwind
CSS • Implemented analytics dashboard and real-time status updates •
Deployed full-stack application to production • Designed secure file
upload and cloud-based media storage • Implemented pagination,
filtering, and search functionality

  ------------------------
  🎯 FUTURE IMPROVEMENTS
  ------------------------

• Real-time notifications • Admin moderation panel • Saved jobs feature
• Company subscription system • Advanced filtering & sorting • Resume
parsing and AI-based job matching

  -----------
  👨‍💻 AUTHOR
  -----------

Vivek Badgujar 