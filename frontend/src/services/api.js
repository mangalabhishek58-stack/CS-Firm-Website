import { validateEnquiry } from '../utils/validateEnquiry.js'

// Never put secrets in VITE_ variables - they are visible in the browser.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

// Set VITE_USE_MOCK_API=true in frontend/.env.local to work on the form
// without the backend running.
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true'

const REQUEST_TIMEOUT_MS = 15000

export class ApiError extends Error {
  constructor(message, { status = 0, fieldErrors = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

const NETWORK_ERROR_MESSAGE =
  'We could not reach the server. Please check your connection and try again - your message has not been lost.'

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
  } catch {
    throw new ApiError(NETWORK_ERROR_MESSAGE)
  }

  let data = null
  try {
    data = await response.json()
  } catch {
    // Non-JSON response; handled below.
  }

  if (!response.ok) {
    throw new ApiError(data?.message || 'Something went wrong. Please try again later.', {
      status: response.status,
      fieldErrors: data?.errors || null,
    })
  }

  return data
}

// Simulates the backend so the form can be built and tested without it.
// Include "[mock-network-error]" or "[mock-server-error]" in the message
// to preview the error states.
async function mockSubmitEnquiry(enquiry) {
  await new Promise((resolve) => setTimeout(resolve, 900))

  if (enquiry.message.includes('[mock-network-error]')) {
    throw new ApiError(NETWORK_ERROR_MESSAGE)
  }
  if (enquiry.message.includes('[mock-server-error]')) {
    throw new ApiError('Something went wrong. Please try again later.', { status: 500 })
  }

  const errors = validateEnquiry(enquiry)
  if (Object.keys(errors).length > 0) {
    throw new ApiError('Please correct the highlighted fields and try again.', {
      status: 400,
      fieldErrors: errors,
    })
  }

  return { success: true, message: 'Thank you. Your enquiry has been received.' }
}

export function submitEnquiry(enquiry) {
  if (USE_MOCK_API) return mockSubmitEnquiry(enquiry)
  return request('/api/enquiries', { method: 'POST', body: JSON.stringify(enquiry) })
}
