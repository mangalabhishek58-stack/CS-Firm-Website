require('dotenv').config({ quiet: true });

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const healthRoutes = require('./routes/health.routes');
const enquiryRoutes = require('./routes/enquiries.routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

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
  app.listen(PORT, () => {
    console.log(`CS Firm API listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
