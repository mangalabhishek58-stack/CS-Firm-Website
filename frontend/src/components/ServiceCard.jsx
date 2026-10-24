import { Link } from 'react-router-dom'

export default function ServiceCard({ service, index }) {
  return (
    <article className="service-card">
      <span className="service-card__index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="service-card__title">
        <Link to={`/services/${service.slug}`} className="service-card__link">
          {service.title}
        </Link>
      </h3>
      <p className="service-card__summary">{service.summary}</p>
      <span className="service-card__more" aria-hidden="true">
        Learn more →
      </span>
    </article>
  )
}
