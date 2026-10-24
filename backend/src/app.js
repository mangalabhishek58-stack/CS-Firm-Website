require('dotenv').config({ quiet: true });

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const healthRoutes = require('./routes/health.routes');
const enquiryRoutes = require('./routes/enquiries.routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { isEmailConfigured } = require('./services/email.service');

const PORT = Number(process.env.PORT) || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// Only the configured frontend origin may call the API. In development this
// defaults to the Vite dev server; in production CORS_ORIGIN must be set.
const corsOrigin = process.env.CORS_ORIGIN || (isProduction ? false : 'http://localhost:5173');

const app = express();

app.use(helmet());
app.use(cors({ origin: corsOrigin, methods: ['GET', 'POST'] }));
app.use(express.json({ limit: '10kb' }));

app.use('/api/health', healthRoutes);
app.use('/api/enquiries', enquiryRoutes);

app.use(notFound);
app.use(errorHandler);

// Start the server only when run directly (npm run dev / npm start),
// so tests can import the app without opening a port.
if (require.main === module) {
  // Express 5 also calls this callback when startup fails; the 'error'
  // handler below reports that case.
  const server = app.listen(PORT, (err) => {
    if (err) return;
    console.log(`CS Firm API listening on http://localhost:${PORT} (process ${process.pid})`);
    if (isEmailConfigured()) {
      console.log(`Enquiry emails will be sent to ${process.env.ENQUIRY_NOTIFY_TO}`);
    } else {
      console.warn('WARNING: email is not configured - enquiries will NOT be emailed. See README "Email notifications setup".');
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(
        [
          '',
          `ERROR: port ${PORT} is already in use - this backend did NOT start.`,
          'Another backend (or other program) is probably still running, and requests are going to it instead.',
          '',
          'Find what is using the port (PowerShell):',
          `  Get-NetTCPConnection -LocalPort ${PORT} -State Listen | Select-Object OwningProcess`,
          'Stop it, then start this backend again:',
          '  Stop-Process -Id <OwningProcess>',
          '',
        ].join('\n')
      );
      process.exit(1);
    }
    throw err;
  });
}

module.exports = app;
