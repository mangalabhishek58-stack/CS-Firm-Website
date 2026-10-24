import Button from '../components/Button.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import CtaStrip from '../components/CtaStrip.jsx'
import ContactDetails from '../components/ContactDetails.jsx'
import { firm } from '../data/firm.js'
import { services } from '../data/services.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

const STEPS = [
  {
    title: 'Understand',
    text: 'We start by understanding your entity, your current compliance position and what you need done.',
  },
  {
    title: 'Plan',
    text: 'We agree the scope, the documents required and the timelines before work begins.',
  },
  {
    title: 'Execute',
    text: 'We prepare drafts and filings, share them for your review and file once approved.',
  },
  {
    title: 'Follow through',
    text: 'We keep you updated on acknowledgements, approvals and the next due dates.',
  },
]

export default function Home() {
  usePageMeta(
    null,
    `${firm.name} is a firm of Company Secretaries in ${firm.city} offering incorporation, ROC compliance, secretarial audit, FEMA and governance support.`
  )

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="eyebrow eyebrow--light">
              {firm.tagline} · {firm.city}
            </p>
            <h1 className="hero__title">Company secretarial and compliance support, handled with care.</h1>
            <p className="hero__intro">
              {firm.name} helps companies and LLPs stay on top of their legal and regulatory obligations - from
              incorporation and annual filings to board processes and FEMA reporting.
            </p>
            <div className="hero__actions">
              <Button to="/contact" variant="light">Enquire Now</Button>
              <Button to="/services" variant="outline-light">Explore services</Button>
            </div>
          </div>

          <aside className="hero__panel" aria-labelledby="hero-panel-title">
            <h2 id="hero-panel-title" className="hero__panel-title">Common areas we help with</h2>
            <ul className="check-list check-list--light">
              <li>Setting up a company or LLP</li>
              <li>Annual ROC filings and director KYC</li>
              <li>Board and shareholder meetings</li>
              <li>Foreign investment reporting</li>
              <li>Changes in capital, directors or structure</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <SectionHeading
            id="services-title"
            eyebrow="What we do"
            title="Services"
            intro="Practical support across the life of your company, from setting it up to keeping it compliant."
          />
          <div className="card-grid">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
          <div className="section__footer">
            <Button to="/services" variant="secondary">View all services</Button>
          </div>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="about-title">
        <div className="container split">
          <SectionHeading id="about-title" eyebrow="About the firm" title={`About ${firm.name}`} />
          <div className="prose">
            <p>
              {firm.name} is a practice of Company Secretaries based in {firm.city}. We work with founders,
              directors and finance teams who want their company secretarial work done correctly and on time.
            </p>
            <p>
              We explain what is required in plain language, agree the scope upfront and keep you informed at each
              step - so compliance feels manageable rather than a last-minute rush.
            </p>
            <Button to="/about" variant="secondary">More about us</Button>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <SectionHeading
            id="process-title"
            eyebrow="How we work"
            title="A clear process, from first call to final filing"
            align="center"
          />
          <ol className="steps">
            {STEPS.map((step, index) => (
              <li key={step.title} className="step">
                <span className="step__number" aria-hidden="true">{index + 1}</span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaStrip />

      <section className="section" aria-labelledby="contact-summary-title">
        <div className="container split">
          <SectionHeading
            id="contact-summary-title"
            eyebrow="Get in touch"
            title="Contact us"
            intro="Call, email or send an enquiry and we will get back to you."
          />
          <div>
            <ContactDetails />
            <Button to="/contact">Send an enquiry</Button>
          </div>
        </div>
      </section>
    </>
  )
}
