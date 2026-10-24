import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import ContactDetails from '../components/ContactDetails.jsx'
import { firm } from '../data/firm.js'
import { getServiceBySlug } from '../data/services.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

export default function Contact() {
  usePageMeta('Contact', `Contact ${firm.name}, Company Secretaries in ${firm.city}. Send an enquiry, call or email us.`)

  // /contact?service=<slug> pre-selects the service in the form.
  const [searchParams] = useSearchParams()
  const preselected = getServiceBySlug(searchParams.get('service'))?.title ?? ''

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Send us an enquiry"
        intro="Tell us briefly what you need. We will get back to you to understand your requirements and discuss next steps."
      />

      <section className="section">
        <div className="container contact-layout">
          <div className="card contact-layout__form">
            <h2 className="card__title">Enquiry form</h2>
            <EnquiryForm key={preselected} initialService={preselected} />
          </div>

          <aside className="contact-layout__aside" aria-labelledby="contact-details-title">
            <h2 id="contact-details-title" className="aside-title">Contact details</h2>
            <ContactDetails />
          </aside>
        </div>
      </section>
    </>
  )
}
