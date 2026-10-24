import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import CtaStrip from '../components/CtaStrip.jsx'
import Detail from '../components/Detail.jsx'
import { firm, founder } from '../data/firm.js'
import { services } from '../data/services.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

const APPROACH = [
  {
    title: 'Plain-language guidance',
    text: 'We explain what the law requires and what it means for your business, without unnecessary jargon.',
  },
  {
    title: 'Scope agreed upfront',
    text: 'Before we start, we confirm what is included, what we need from you and the expected timelines.',
  },
  {
    title: 'Careful documentation',
    text: 'Drafts are shared for your review, and records are kept organised for future reference.',
  },
  {
    title: 'Proactive reminders',
    text: 'We help you keep track of upcoming due dates so filings are not left to the last minute.',
  },
]

export default function About() {
  usePageMeta(
    'About',
    `Learn about ${firm.name}, a Company Secretary practice in ${firm.city}, its practice focus and approach.`
  )

  const initials = founder.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <>
      <PageHero
        eyebrow="About us"
        title={`About ${firm.name}`}
        intro={`A Company Secretary practice in ${firm.city}, supporting companies and LLPs with secretarial, governance and regulatory compliance.`}
      />

      <section className="section">
        <div className="container split">
          <SectionHeading title="Who we are" />
          <div className="prose">
            <p>
              {firm.name} provides company secretarial services to businesses at different stages - from
              founders incorporating their first company to established entities managing ongoing compliance.
            </p>
            <p>
              Our work covers the Companies Act, 2013, LLP compliance, FEMA reporting and, for listed entities,
              SEBI requirements. We aim to be a dependable point of contact for these obligations so you can focus on
              running your business.
            </p>
            <p className="muted">
              <Detail value={firm.registration} />
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="focus-title">
        <div className="container split">
          <SectionHeading id="focus-title" title="Practice focus" />
          <ul className="check-list">
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeading id="approach-title" title="Our approach" align="center" />
          <div className="feature-grid">
            {APPROACH.map((item) => (
              <div key={item.title} className="feature">
                <h3 className="feature__title">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="founder-title">
        <div className="container">
          <SectionHeading id="founder-title" eyebrow="Leadership" title="Founder" />
          <article className="profile">
            <div className="profile__avatar" aria-hidden="true">{initials}</div>
            <div className="profile__body">
              {founder.isDemo && <p className="demo-badge">Demo profile - to be replaced with verified details</p>}
              <h3 className="profile__name">{founder.name}</h3>
              <p className="profile__role">
                {founder.role} · <Detail value={founder.qualification} />
              </p>
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <CtaStrip title="Would you like to discuss your requirements?" />
    </>
  )
}
