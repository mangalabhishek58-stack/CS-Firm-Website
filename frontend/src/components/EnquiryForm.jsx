import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from './FormField.jsx'
import Button from './Button.jsx'
import { services } from '../data/services.js'
import { LIMITS, validateEnquiry } from '../utils/validateEnquiry.js'
import { submitEnquiry } from '../services/api.js'

const GENERAL_ENQUIRY = 'General enquiry / not sure'
const FIELD_ORDER = ['name', 'email', 'phone', 'service', 'message']

const emptyValues = (service = '') => ({
  name: '',
  email: '',
  phone: '',
  service,
  message: '',
  website: '', // honeypot - hidden from real visitors
})

export default function EnquiryForm({ initialService = '' }) {
  const [values, setValues] = useState(() => emptyValues(initialService))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [statusMessage, setStatusMessage] = useState('')
  const formRef = useRef(null)

  const focusFirstError = (fieldErrors) => {
    const first = FIELD_ORDER.find((field) => fieldErrors[field])
    if (first) formRef.current?.querySelector(`#${first}`)?.focus()
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    // Clear a field's error as soon as the visitor fixes it.
    if (errors[name]) {
      const next = validateEnquiry({ ...values, [name]: value })
      setErrors((current) => ({ ...current, [name]: next[name] }))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'submitting') return

    const fieldErrors = validateEnquiry(values)
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length > 0) {
      setStatus('idle')
      focusFirstError(fieldErrors)
      return
    }

    setStatus('submitting')
    setStatusMessage('')
    try {
      const result = await submitEnquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        service: values.service,
        message: values.message.trim(),
        website: values.website,
      })
      setStatus('success')
      setStatusMessage(result?.message || 'Thank you. Your enquiry has been received.')
      setValues(emptyValues())
      setErrors({})
    } catch (error) {
      // Keep everything the visitor typed so they can simply try again.
      setStatus('error')
      setStatusMessage(error.message)
      if (error.fieldErrors) {
        setErrors(error.fieldErrors)
        focusFirstError(error.fieldErrors)
      }
    }
  }

  if (status === 'success') {
    return (
      <div className="form-status form-status--success" role="status">
        <h3 className="form-status__title">Enquiry sent</h3>
        <p>{statusMessage} We will be in touch using the details you provided.</p>
        <Button variant="secondary" onClick={() => setStatus('idle')}>
          Send another enquiry
        </Button>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form ref={formRef} className="enquiry-form" onSubmit={handleSubmit} noValidate aria-busy={submitting}>
      <p className="enquiry-form__note">
        Fields marked <span aria-hidden="true">*</span>
        <span className="visually-hidden">with an asterisk</span> are required.
      </p>

      <div className="enquiry-form__row">
        <FormField
          id="name"
          label="Full name"
          required
          autoComplete="name"
          maxLength={LIMITS.name.max}
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormField
          id="email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          maxLength={LIMITS.email.max}
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
      </div>

      <div className="enquiry-form__row">
        <FormField
          id="phone"
          label="Phone number"
          type="tel"
          autoComplete="tel"
          maxLength={LIMITS.phone.max}
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <FormField
          id="service"
          label="Service of interest"
          as="select"
          required
          value={values.service}
          onChange={handleChange}
          error={errors.service}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value={GENERAL_ENQUIRY}>{GENERAL_ENQUIRY}</option>
        </FormField>
      </div>

      <FormField
        id="message"
        label="How can we help?"
        as="textarea"
        rows={6}
        required
        maxLength={LIMITS.message.max}
        hint="A short description is enough. Please do not share confidential documents or sensitive personal information here."
        value={values.message}
        onChange={handleChange}
        error={errors.message}
      />

      {/* Honeypot field: hidden from people, often filled in by spam bots. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
      </div>

      <p className="enquiry-form__privacy">
        We use the details you share only to respond to your enquiry. See our{' '}
        <Link to="/privacy">privacy policy</Link> for more information.
      </p>

      <div role="alert" className="form-alert-region">
        {status === 'error' && statusMessage && <p className="form-status form-status--error">{statusMessage}</p>}
      </div>

      <button type="submit" className="btn btn--primary enquiry-form__submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  )
}
