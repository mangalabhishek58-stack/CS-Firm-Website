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
| | `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | SMTP server and login for enquiry notifications |
| | `EMAIL_FROM` | Sender shown on notifications (for Gmail, must be the `SMTP_USER` address) |
| | `ENQUIRY_NOTIFY_TO` | Inbox that receives new enquiries |
| `frontend/.env.local` | `VITE_API_BASE_URL` | API base URL (default `http://localhost:5000`) |
| | `VITE_USE_MOCK_API` | `true` to fake API responses so the form works without the backend |

Copy each `.env.example` to create your local file. Never commit real `.env` files, and never put
secrets in `VITE_` variables – they are visible in the browser.

## API

- `GET /api/health` – `{ "success": true, "message": "CS Firm API is running" }`
- `POST /api/enquiries` – body `{ name, email, phone?, service, message }`
  - `201` received, `400` validation errors (`errors` keyed by field), `413` too large, `429` rate limited,
    `503` email could not be sent
  - Each valid enquiry is emailed to `ENQUIRY_NOTIFY_TO`; replying to the email replies to the visitor.
  - If SMTP is not configured: in development enquiries are only logged (without personal data);
    in production they are rejected with `503` so none are silently lost.

## Email notifications setup

1. Choose an SMTP provider. With Gmail: turn on 2-Step Verification for the sending account, then
   create an **App Password** (Google Account → Security → App passwords). Never use the normal password.
2. In `backend/.env`, fill in `SMTP_USER`, `SMTP_PASS` (the App Password), `EMAIL_FROM` and
   `ENQUIRY_NOTIFY_TO`. The Gmail host/port defaults are already in `.env.example`.
3. Restart the backend, then send a test email:

   ```powershell
   cd D:\cs-firm-website\backend
   npm run email:test
   ```

Tests never send real email, even when `backend/.env` contains real SMTP settings.

## Tests and checks

```powershell
cd D:\cs-firm-website\backend;  npm test          # API tests (node:test)
cd D:\cs-firm-website\frontend; npm run lint      # oxlint
cd D:\cs-firm-website\frontend; npm run build     # production build check
```

In mock mode, include `[mock-network-error]` or `[mock-server-error]` in the enquiry message to
preview the form's error states.

## Troubleshooting

**Is the right backend running?** Open http://localhost:5000/api/health. In development it shows
`dev.pid`, `dev.startedAt` and `dev.emailConfigured`. Compare `pid` with the
`listening ... (process N)` line in your backend terminal - if they differ, an old backend is still
holding the port.

**`ERROR: port 5000 is already in use`** - another process has the port, so your backend did not start:

```powershell
Get-NetTCPConnection -LocalPort 5000 -State Listen | Select-Object OwningProcess
Stop-Process -Id <OwningProcess>
```

**Form says "sent" but no email** - check the backend terminal:
- `WARNING: email is not configured` → fill in the SMTP settings in `backend/.env`, then restart
  (`.env` changes are not picked up automatically).
- `[enquiry] received ... emailDelivered=false` → same as above.
- `[enquiry] email delivery failed` → SMTP problem; run `npm run email:test` to see the error.
- Nothing logged at all → the request went to a different backend (see the port check above).

## Editing content

- Firm details: `frontend/src/data/firm.js`
- Services: `frontend/src/data/services.js` (each service's `resources` lists its official links)
- Official links for `/resources`: `frontend/src/data/resources.js` – official sources only; re-check
  them periodically and update `RESOURCES_LAST_CHECKED`

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
