# Vibhor Associates – Website

Website for Vibhor Associates, Company Secretaries, Delhi.

- **frontend/** – React + Vite (JavaScript/JSX), plain CSS, `react-router-dom`
- **backend/** – Node.js + Express (CommonJS) REST API for enquiries

## Prerequisites

- Node.js 20+ (developed on Node 24)
- npm

## Setup and run

Run each app in its own terminal.

**Backend** (http://localhost:5000)

```powershell
cd D:\cs-firm-website\backend
npm install
Copy-Item .env.example .env   # first time only, then edit if needed
npm run dev
```

Health check: http://localhost:5000/api/health

**Frontend** (http://localhost:5173)

```powershell
cd D:\cs-firm-website\frontend
npm install
npm run dev
```

## Environment variables

| File | Variable | Purpose |
| --- | --- | --- |
| `backend/.env` | `PORT` | API port (default `5000`) |
| | `NODE_ENV` | `development` or `production` |
| | `CORS_ORIGIN` | Allowed frontend origin (default `http://localhost:5173` in development; required in production) |
| | `ENQUIRY_RATE_LIMIT_MAX` | Enquiries allowed per IP per 15 minutes (default `5`) |
| | `SMTP_*` | Email provider settings – not used yet |
| `frontend/.env.local` | `VITE_API_BASE_URL` | API base URL (default `http://localhost:5000`) |
| | `VITE_USE_MOCK_API` | `true` to fake API responses so the form works without the backend |

Copy each `.env.example` to create your local file. Never commit real `.env` files, and never put
secrets in `VITE_` variables – they are visible in the browser.

## API

- `GET /api/health` – `{ "success": true, "message": "CS Firm API is running" }`
- `POST /api/enquiries` – body `{ name, email, phone?, service, message }`
  - `201` received, `400` validation errors (`errors` keyed by field), `413` too large, `429` rate limited
  - Email delivery is not configured yet; enquiries are validated and logged without personal data.

## Tests and checks

```powershell
cd D:\cs-firm-website\backend;  npm test          # API tests (node:test)
cd D:\cs-firm-website\frontend; npm run lint      # oxlint
cd D:\cs-firm-website\frontend; npm run build     # production build check
```

In mock mode, include `[mock-network-error]` or `[mock-server-error]` in the enquiry message to
preview the form's error states.

## Editing content

- Firm details: `frontend/src/data/firm.js`
- Services: `frontend/src/data/services.js`

Text in `[square brackets]` is a placeholder and is highlighted on the site. The founder profile and
logo are demo content. Replace all of these with verified details before going live, and review ICSI
rules on advertising and professional conduct before publishing.

## Placeholders to replace before launch

- Full office address and working days
- ICSI firm registration / membership number
- Founder qualification and verified profile
- Approved logo
- Privacy policy "last updated" date and retention period
- Map link (`mapUrl`)
- Email provider for enquiry notifications
