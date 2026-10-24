function notFound(req, res) {
  res.status(404).json({ success: false, message: 'Not found.' });
}

// Express recognises error handlers by their four arguments.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Request body must be valid JSON.' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ success: false, message: 'Request is too large.' });
  }

  // Full details stay in the server log; the client only gets a generic message.
  console.error(err);
  return res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
}

module.exports = { notFound, errorHandler };
