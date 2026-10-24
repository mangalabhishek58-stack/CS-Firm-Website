import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Button from '../components/Button.jsx'
import CtaStrip from '../components/CtaStrip.jsx'
import NotFound from './NotFound.jsx'
import { getServiceBySlug, services } from '../data/services.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) return <NotFound />
  return <ServiceDetailContent service={service} />
}

function ServiceDetailContent({ service }) {
  usePageMeta(service.title, service.summary)

  const otherServices = services.filter((item) => item.slug !== service.slug)

  return (
    <>
      <PageHero eyebrow="Services" title={service.title} intro={service.summary}>
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li aria-current="page">{service.title}</li>
          </ol>
        </nav>
      </PageHero>

      <section className="section">
        <div className="container detail-layout">
          <div className="detail-layout__main">
            <h2 className="detail-heading">What this covers</h2>
            <ul className="check-list">
              {service.covers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="detail-heading">Who it may suit</h2>
            <ul className="check-list">
              {service.suitedFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="disclaimer">
              This is general information, not advice on your specific situation. Requirements depend on the type
              of entity, its size and the transactions involved.
            </p>

            <Button to={`/contact?service=${service.slug}`}>Enquire about this service</Button>
          </div>

          <aside className="detail-layout__aside" aria-labelledby="other-services-title">
            <h2 id="other-services-title" className="aside-title">Other services</h2>
            <ul className="link-list">
              {otherServices.map((item) => (
                <li key={item.slug}>
                  <Link to={`/services/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <CtaStrip />
    </>
  )
}
