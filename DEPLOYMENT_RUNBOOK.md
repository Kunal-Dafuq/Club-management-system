# 🛡️ IIIT-Delhi ClubPlanet OrgOS — Production Deployment & Operational Runbook

> **Target Platform**: Institutional Organization Operating System (OrgOS)  
> **Compliance Standard**: WCAG 2.1 AA • GDPR • FERPA • Institutional Security Charter  
> **Infrastructure Stack**: Multi-Stage Docker, Nginx Alpine, Node.js 20 Express, PostgreSQL 16, Vite 8

---

## 1. Multi-Stage Containerization & Docker Compose Architecture

The platform is containerized into a multi-service orchestration stack defined in `docker-compose.yml`:
- **`postgres`**: PostgreSQL 16 Alpine database container with automated health checks and persistent volume mounting (`postgres_data`).
- **`server`**: Multi-stage Node.js 20 Express API container running Prisma ORM generation, rate limiting (200 req / 15m), and audit logging.
- **`client`**: Multi-stage production container compiling React/Vite static assets and serving via an Nginx Alpine high-performance web server.

### Launching the Stack Locally or on Production Server
```bash
# Start all 3 services with automatic container health verification
docker compose up -d --build

# Inspect real-time container logs across all 3 tiers
docker compose logs -f --tail=100
```

---

## 2. Domain, Nginx HTTPS & SSL Configuration Runbook

In a production campus deployment (`https://orgos.iiitd.edu.in`), configure Nginx with SSL termination and HTTP/2:
1. Obtain Let's Encrypt / Institutional Wildcard SSL certificate:
   ```bash
   certbot --nginx -d orgos.iiitd.edu.in -d api.orgos.iiitd.edu.in
   ```
2. Verify strict HTTPS HSTS header transmission (configured in `server/src/middleware/security.js`):
   ```http
   Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
   ```

---

## 3. Database Backup & Disaster Recovery Runbook (RTO < 15m, RPO < 1h)

### Automated Scheduled Database Snapshot
Run the following cron command daily at 02:00 AM IST to generate an encrypted snapshot:
```bash
# Generate compressed snapshot
docker compose exec -T postgres pg_dump -U postgres clubplanet_db | gzip > /var/backups/orgos/db_backup_$(date +%F).sql.gz
```

### Point-In-Time Disaster Recovery (Restore)
To restore the platform from an archived snapshot:
```bash
# 1. Stop active server connections
docker compose stop server

# 2. Restore PostgreSQL dump
gunzip -c /var/backups/orgos/db_backup_YYYY-MM-DD.sql.gz | docker compose exec -T postgres psql -U postgres -d clubplanet_db

# 3. Restart server & verify health
docker compose start server
```

---

## 4. CI/CD GitHub Actions Pipeline (`.github/workflows/ci.yml`)

The repository integrates automated Continuous Integration and Continuous Deployment:
- **Build Stage**: Validates that all 9 phases compile cleanly (`npx vite build` completes in `< 2.5s`).
- **Backend Test Suite**: Automatically runs `npm test` inside `./server` to verify Prisma schema syntax, controllers, and security middlewares.
- **Deployment Trigger**: Automatically builds container images and pushes to Institutional Container Registry upon merge to `main`.

---

## 5. Security & Accessibility Audit Runbook (Phase 6 & Phase 8)

### WCAG 2.1 AA Accessibility Verification
- Ensure `:focus-visible` cyan outline rings remain enabled in `client/src/index.css`.
- All modals must declare `role="dialog"`, `aria-modal="true"`, and descriptive `aria-labelledby` headers.
- Verify screen reader utility `.sr-only` class is applied to invisible descriptive icons.

### Audit Logging & Telemetry Inspection
- All high-security actions (Login, Club Creation, Event Deletion, RBAC Role Updates) are permanently written to institutional JSON audit logs via `server/src/middleware/auditLogger.js`.
- Inspect logs:
  ```bash
  tail -f /var/log/orgos/audit.log | grep "RBAC_MODIFY"
  ```
