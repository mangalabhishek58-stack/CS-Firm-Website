import PageHero from '../components/PageHero.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import CtaStrip from '../components/CtaStrip.jsx'
import { firm } from '../data/firm.js'
import { services } from '../data/services.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

export default function Services() {
  usePageMeta(
    'Services',
    `Company secretarial services from ${firm.name}: incorporation, ROC compliance, secretarial audit, meetings, FEMA, restructuring and SEBI compliance.`
  )

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Company secretarial services"
        intro="Support across incorporation, ongoing compliance, governance and regulatory reporting. Select a service to see what it covers."
      />

      <section className="section">
        <div className="container">
          <div className="card-grid">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
          <p className="disclaimer">
            Service descriptions are general information. What applies to your business depends on its specific
            facts, which we will discuss with you before taking up any work.
          </p>
        </div>
      </section>

      <CtaStrip title="Not sure which service you need?" text="Describe your situation and we will help you work out the right next step." />
    </>
  )
}
