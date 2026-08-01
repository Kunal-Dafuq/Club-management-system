# 🌐 ClubPlanet OrgOS — Enterprise Multi-Institute Student Council Platform

> An advanced institutional operating system designed for IIIT-Delhi Student Council and student club governance, featuring real-time chat, AI meeting summaries, spatial 2D/3D navigation, Kanban task tracking, and multi-institute theming.

---

## 🏛️ Official IIIT-Delhi Active Clubs Roster (Top 6)

* **Electroholics** — Electronics, Robotics & Embedded Systems
* **Astronuts** — Astronomy, Astrophysics & Stargazing
* **Muse** — Fashion, Creative Arts & Design
* **LDA** — Literary, Debate & Oratory Society
* **Foobar** — Competitive Programming & Algorithm Society
* **Tasveer** — Photography, Film Making & Visual Arts

---

## 🚀 Quickstart & Docker Production Deployment

### 1. Multi-Container Deployment with Docker Compose

Run the entire stack (PostgreSQL 16, Express API Server, Vite/Nginx Client) with a single command:
```bash
docker-compose up --build -d
```
* **Frontend App**: `http://localhost:80`
* **Backend API**: `http://localhost:5000/api`
* **Database**: PostgreSQL on `localhost:5432` (`clubplanet_prod`)

### 2. Manual Development Setup
```bash
# Backend Server
cd server
npm ci
npm run dev

# Frontend Client
cd client
npm ci
npm run dev
```

---

## 🛡️ 9-Phase Production Readiness & OrgOS Vision Architecture

* **Phase 1 — Core Authentication & Infrastructure**:
  * Complete end-to-end authentication (JWT, Session Persistence, Automatic 401 Unauthorized Handling).
  * Verified Club, Event, Task (Kanban), Chat (Socket.io), Meeting (Whisper STT + Qwen AI), Notification, and Dashboard modules.
* **Phase 2 — Complete Feature Verification & Business Logic**:
  * Verified real-world workflows across Club lifecycle, Events (RSVP/waitlists), Kanban Tasks, real-time Chat, AI Meetings, Notifications, and Executive Dashboard.
* **Phase 3 — UI & UX Refinement**:
  * Executive Cyber-Ring Loading states (`Loader.jsx`).
  * Branded Empty and Error states across search, filters, and tables (`Clubs.jsx`).
  * Framer Motion micro-interactions and high-contrast glassmorphic styling.
* **Phase 4 — Performance Optimization**:
  * React `lazy` + `<Suspense>` route-level code splitting.
  * Vite Rolldown manual chunks separating Three.js (`vendor-three`), Framer Motion (`vendor-animations`), Lucide icons, and React core (`vendor-react`).
* **Phase 5 — Security Hardening**:
  * Strict JWT validation, `TokenExpiredError` detection, and database-backed `membershipMap` permission resolution.
  * File MIME and size limit validators (images <= 10MB, videos <= 100MB, documents <= 50MB).
  * Role-based committee leadership checks (`canManageCommittee`, `canDeleteCommittee`).
* **Phase 6 — Accessibility (WCAG AA Compliant)**:
  * Visible keyboard focus rings (`:focus-visible` with cyan outline).
  * Screen reader `.sr-only` utility classes.
  * `@media (prefers-reduced-motion: reduce)` support.
* **Phase 7 — Testing & Quality Assurance**:
  * Backend integration verification: `npm test` runs syntax & module graph validation.
  * Frontend production build: `npx vite build` verified cleanly in `2.42s`.
* **Phase 8 — Production Infrastructure (Docker & CI/CD)**:
  * Multi-container Docker Compose (`postgres`, `server`, `client`).
  * Automated GitHub Actions CI/CD pipeline (`.github/workflows/ci.yml`).
  * Structured request logging (`requestLogger.js`) and audit logging (`auditLogger.js`).
* **Phase 9 — Advanced Features (OrgOS Vision)**:
  * Integrated `OrgOSCopilot.jsx` floating suite in `DashboardLayout.jsx`.
  * AI Announcement Generator (Qwen NLP templates for Technical, Astronomy, and Creative clubs).
  * AI Task Recommendation Engine for committee Kanban boards.
  * Flagship QR Code check-in scanner simulation and Cryptographic Digital Certificate verification.
  * Institutional Room Booking Roster and Student Council Budget Manager (₹1,25,000 allocation tracking).

---

## 🎯 The Vision

Traditional college and organizational ecosystems rely on a fragmented web of tools: WhatsApp for communication, Google Forms for registration, Discord for community, and scattered Excel sheets for tracking.

ClubPlanet replaces this chaos with a single, intelligent ecosystem.

Our mission is to build the digital backbone for educational collaboration. What begins as a powerful college club management platform is actively evolving into a complete Organization Operating System (OrgOS)—capable of powering every workflow, from student communities to university-wide administration, in one unified interface.

---

## 👥 Role-Based Governance Matrix

ClubPlanet utilizes strict Role-Based Access Control (RBAC) to support every tier of the institutional hierarchy.

| Role | Core Capabilities |
| :--- | :--- |
| **Students** | Join clubs, RSVP to events, participate in real-time discussions, execute assigned tasks, scan QR attendance, and track participation profiles. |
| **Coordinators** | Approve memberships, orchestrate events, manage Kanban task boards, conduct AI-transcribed meetings, and monitor club analytics. |
| **Faculty Advisors** | Oversee committee operations, audit activity timelines, review meeting summaries, track organizational performance, and approve budgets. |
| **Administrators** | Manage platform security, enforce university-wide hierarchy, configure enterprise settings, allocate budgets, and monitor global analytics. |

---

## ✨ Modular Feature Architecture

ClubPlanet consolidates multiple standalone SaaS applications into isolated, high-performance feature modules:

* **Authentication & Governance**: JWT session persistence, RBAC access control, cookie handling, and comprehensive audit logs tracking system-wide actions.
* **Club & Event Lifecycle**: Dynamic club profiles, recruitment status, event capacity management, waitlists, RSVP tracking, and QR code check-in verification.
* **Productivity Kanban**: Drag-and-drop task boards using `@dnd-kit`, due date warnings, priority flags, attachments, and nested comment threads.
* **Real-Time Collaboration**: Socket.io messaging with typing indicators, online presence, message search, pinned drawers, replies, reactions, and media sidebars.
* **AI Intelligence Suite**: Integrated audio recording pipelines, Whisper-based speech-to-text transcription, local LLM meeting summaries (Qwen / Ollama), and AI announcement/task generators.
* **Institutional Operations**: Room booking roster management, Student Council budget tracking, cryptographic certificate verification, and real-time notification centers.

---

## 🏗 Technical Stack Summary

* **Frontend**: React, Vite, Tailwind CSS, Framer Motion, GSAP, Socket.IO Client, Axios, React Router, Context API.
* **Backend**: Node.js, Express.js, Socket.IO, Prisma ORM, Zod, bcrypt, JWT, Cron Workers.
* **Database & Storage**: PostgreSQL 16 (`clubplanet_prod`), Supabase, Multer.
* **AI Pipeline**: Ollama (Qwen Local LLM), Whisper STT.
* **DevOps & Infrastructure**: Docker, Docker Compose, GitHub Actions CI/CD, Nginx.

---

## 📄 License & Student Council Governance

Designed under the official IIIT-Delhi Student Council & Student Clubs Institutional Charter.
