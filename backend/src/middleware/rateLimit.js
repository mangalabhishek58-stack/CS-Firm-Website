/**
 * Minimal in-memory, per-IP fixed-window rate limiter.
 * Fine for a single server process. If the API is ever run as several
 * instances, switch to a shared store (e.g. Redis) or express-rate-limit.
 */
function createRateLimiter({ windowMs, max }) {
  const hits = new Map();

  // Periodically drop expired entries so memory does not grow.
  const cleanup = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }, windowMs);
  cleanup.unref();

  return function rateLimit(req, res, next) {
    const key = req.ip;
    const now = Date.now();
    let entry = hits.get(key);

    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(key, entry);
    }

    entry.count += 1;

    if (entry.count > max) {
      res.set('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({
        success: false,
        message: 'Too many enquiries from this connection. Please try again later.',
      });
    }

    return next();
  };
}

module.exports = { createRateLimiter };
