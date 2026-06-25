# Moriah Tech Labs – Lead Generation Platform

A full-stack lead generation platform for a Project Training Program.

- **Frontend**: React 19 + Vite + Tailwind CSS (your existing code)
- **Backend**: Java 17 + Spring Boot 3.2 + Spring Data JPA + Spring Security
- **Database**: H2 (dev, zero setup) or MySQL (production)

---

## Project Structure

```
moriah-tech-labs/
├── backend/                  ← Spring Boot application
│   ├── src/main/java/com/moriah/leadgen/
│   │   ├── controller/       ← REST controllers
│   │   ├── service/          ← Business logic
│   │   ├── repository/       ← JPA repositories
│   │   ├── entity/           ← JPA entities
│   │   ├── dto/              ← Request/response DTOs
│   │   ├── exception/        ← Error handling
│   │   └── config/           ← Security & CORS config
│   ├── src/main/resources/
│   │   ├── application.properties        ← H2 (default)
│   │   └── application-mysql.properties  ← MySQL profile
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                 ← React application
│   ├── src/
│   │   ├── App.jsx           ← Updated: calls Spring Boot API
│   │   ├── components/
│   │   │   ├── LandingPage.jsx
│   │   │   └── AdminPortal.jsx  ← Updated: real login + backend CSV
│   │   └── types.js
│   ├── .env                  ← VITE_API_BASE_URL
│   ├── vite.config.ts        ← Dev proxy to :8080
│   ├── nginx.conf            ← Production nginx
│   └── Dockerfile
│
├── docker-compose.yml        ← One-command full stack
└── README.md
```

---

## Quick Start (Development)

### Option A – H2 Database (zero setup, recommended for first run)

**1. Start the backend**
```bash
cd backend
./mvnw spring-boot:run
# Backend starts at http://localhost:8080
# H2 Console: http://localhost:8080/h2-console (JDBC URL: jdbc:h2:mem:moriah_leads)
```

**2. Start the frontend**
```bash
cd frontend
npm install
npm run dev
# Frontend starts at http://localhost:3000
```

**3. Open the app**
- Landing page: http://localhost:3000
- Admin portal: click the small admin link in the footer → login with `admin` / `moriah@2024`

---

### Option B – MySQL Database

**1. Create the database**
```sql
CREATE DATABASE moriah_leads CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**2. Start the backend with MySQL profile**
```bash
cd backend
DB_USERNAME=root DB_PASSWORD=yourpassword \
  ./mvnw spring-boot:run --spring.profiles.active=mysql
```

**3. Start the frontend** (same as above)

---

### Option C – Docker Compose (full stack)

```bash
# Copy and edit the env file
cp .env.example .env   # add MAIL_USERNAME and MAIL_PASSWORD

docker-compose up --build
```

- Frontend: http://localhost
- Backend API: http://localhost:8080
- Admin login: `admin` / `moriah@2024`

---

## API Reference

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/leads` | Submit lead from landing page |

**POST /api/leads – Request body**
```json
{
  "fullName": "Rahul Kumar",
  "email": "rahul@example.com",
  "mobileNumber": "9876543210",
  "qualification": "B.Tech",
  "interestedTechnology": "Java Full Stack",
  "trainingMode": "Online",
  "message": "I want project training details"
}
```

### Admin Endpoints (Basic Auth required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Dashboard stats |
| GET | `/api/admin/leads` | All leads |
| GET | `/api/admin/leads/{id}` | Single lead |
| GET | `/api/admin/leads/search` | Filter leads |
| PATCH | `/api/admin/leads/{id}/status` | Update status |
| DELETE | `/api/admin/leads/{id}` | Delete lead |
| GET | `/api/admin/leads/export` | Download CSV |

**Search parameters**: `technology`, `trainingMode`, `status`, `startDate` (yyyy-MM-dd), `endDate`

---

## Configuration

### Backend (`application.properties`)

| Property | Default | Description |
|----------|---------|-------------|
| `app.admin.username` | `admin` | Admin login username |
| `app.admin.password` | `moriah@2024` | Admin login password |
| `spring.mail.username` | — | Gmail/SMTP email address |
| `spring.mail.password` | — | Gmail App Password |
| `app.cors.allowed-origin` | `http://localhost:3000` | Frontend URL |

Override any property via environment variable, e.g.:
```bash
ADMIN_PASSWORD=mysecurepassword ./mvnw spring-boot:run
```

### Frontend (`.env`)

```
VITE_API_BASE_URL=http://localhost:8080
```

In production, set this to your deployed backend URL.

---

## Email Notifications

Two emails are sent automatically on each lead submission (async – never blocks the response):
1. **Confirmation email** to the visitor
2. **Admin notification email** to the configured sender address

To enable emails, set `MAIL_USERNAME` and `MAIL_PASSWORD` in your environment.
For Gmail: create an **App Password** at https://myaccount.google.com/apppasswords

If email is not configured, leads are still saved — the app just logs a warning.

---

## Database Schema

```sql
CREATE TABLE leads (
  lead_id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  full_name        VARCHAR(100) NOT NULL,
  email            VARCHAR(150) NOT NULL,
  mobile_number    VARCHAR(20)  NOT NULL,
  qualification    VARCHAR(100),
  interested_technology VARCHAR(100),
  training_mode    VARCHAR(50),
  message          TEXT,
  source           VARCHAR(100) DEFAULT 'Website',
  status           VARCHAR(50)  DEFAULT 'New',
  assigned_counselor VARCHAR(100),
  created_at       TIMESTAMP,
  updated_at       TIMESTAMP
);
```

---

## Frontend ↔ Backend Integration

The frontend was updated to:

1. **Lead form** (`LandingPage.jsx`): On submit, immediately shows success UI (optimistic), then POSTs to `POST /api/leads` asynchronously.
2. **Admin login** (`AdminPortal.jsx`): Authenticates against `GET /api/admin/leads` using HTTP Basic Auth. Falls back to `admin/admin` demo mode if backend is unreachable.
3. **Admin dashboard** (`App.jsx`): Calls `GET /api/admin/leads` on login to fetch real data from the database.
4. **CSV export** (`AdminPortal.jsx`): Calls `GET /api/admin/leads/export` to download a server-generated CSV. Falls back to client-side CSV if backend is unreachable.
5. **Status updates**: Admin status changes are PATCHed to `/api/admin/leads/{id}/status`.

The app is **offline-resilient**: if the backend is unreachable, it falls back to local in-memory state and localStorage, so the UI is always functional.
