# 🚀 JOBDHUNDHO — Full Stack Job Portal Platform

🌐 **Live Application:**
https://job-portal-website-vzmm.onrender.com

---

# 📌 Overview

**JobDhundho** is a production-ready full-stack job portal platform designed to connect job seekers and companies through a secure, scalable, and modern web application.

The system supports role-based authentication, job posting and management, resume uploads, application tracking, analytics dashboards, and automated email notifications.

This project demonstrates real-world backend architecture, REST API design, frontend engineering, authentication workflows, cloud integration, and full-stack deployment.

---

# 🛠 Tech Stack

## Frontend

* React (Vite)
* React Router
* Axios
* Tailwind CSS
* Context API (Global Authentication State)
* JWT Token Handling

## Backend

* Django
* Django REST Framework
* Simple JWT (Authentication)
* PostgreSQL (Production Database)
* Django Filters
* WhiteNoise (Static Files)

## Cloud & Integrations

* Cloudinary (Resume Storage)
* SendGrid (Email Service)

## Deployment

* Render (Frontend + Backend)
* GitHub (Version Control)

---

# ✨ Key Features

## 🔐 Authentication & Security

* Email OTP verification via SendGrid
* JWT-based authentication with refresh tokens
* Login using email or username
* Role-based access control (Applicant / Company)
* Secure profile management

## 👨‍💼 Company Features

* Create and manage company profiles
* Post and delete job listings
* View applications grouped by job
* Accept or reject applications
* Automated email notifications on status updates
* Company analytics dashboard

## 👨‍🎓 Applicant Features

* Browse, search, and filter jobs
* Apply with resume upload (Cloudinary integration)
* Track application status
* Personalized applicant dashboard

## 📊 Analytics

* Total jobs posted
* Total applications received
* Application status statistics (Pending / Accepted / Rejected)

## 📧 Email Integration

* OTP verification emails
* Application acceptance/rejection emails
* HTML and plain-text email support
* Secure SendGrid API integration

## 📂 Cloud File Management

* Resume upload to Cloudinary
* Secure file storage with CDN delivery
* Production-ready media handling

---

# 🏗 System Architecture

React Frontend
↓
Django REST API
↓
PostgreSQL Database
↓
Cloudinary (File Storage)
↓
SendGrid (Email Service)

---

# 📁 Project Structure

```
backend/
    apps/
        accounts/
        companies/
        jobs/
        applications/
    config/
    settings.py
    urls.py

frontend/
    src/
        pages/
        components/
        layouts/
        context/
        api/
```

---

# 🔑 Important API Endpoints

## Authentication

* POST `/api/accounts/start-register/`
* POST `/api/accounts/verify-email/`
* POST `/api/accounts/login/`
* GET `/api/accounts/me/`
* PATCH `/api/accounts/me/`

## Jobs

* GET `/api/jobs/`
* POST `/api/jobs/`
* GET `/api/jobs/{id}/`
* DELETE `/api/jobs/{id}/delete/`

## Applications

* POST `/api/applications/apply/`
* GET `/api/applications/company/`
* PATCH `/api/applications/{id}/update/`
* GET `/api/applications/analytics/`
* GET `/api/applications/my/`

---

# 🚀 Local Development Setup

## Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔐 Environment Variables

## Backend (.env)

```
SECRET_KEY=
DEBUG=
DATABASE_URL=
SENDGRID_API_KEY=
DEFAULT_FROM_EMAIL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Frontend (.env)

```
VITE_API_URL=backend-url
```

---

# 🎯 Future Improvements

* Real-time notifications (WebSockets)
* Admin moderation panel
* Saved jobs feature
* Company subscription plans
* Advanced search and sorting
* AI-based resume parsing and job matching

---

# 👨‍💻 Author

**Vivek Badgujar**

---
