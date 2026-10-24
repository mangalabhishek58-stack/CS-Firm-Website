import Detail from './Detail.jsx'
import { firm } from '../data/firm.js'

export default function ContactDetails() {
  return (
    <dl className="contact-details">
      <div className="contact-details__item">
        <dt>Phone</dt>
        <dd><a href={`tel:${firm.phoneLink}`}>{firm.phoneDisplay}</a></dd>
      </div>
      <div className="contact-details__item">
        <dt>Email</dt>
        <dd><a href={`mailto:${firm.email}`}>{firm.email}</a></dd>
      </div>
      <div className="contact-details__item">
        <dt>Office</dt>
        <dd>
          <Detail value={firm.address} />
          {firm.mapUrl && (
            <>
              <br />
              <a href={firm.mapUrl} target="_blank" rel="noopener noreferrer">
                View on map<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </>
          )}
        </dd>
      </div>
      <div className="contact-details__item">
        <dt>Office hours</dt>
        <dd>
          <Detail value={firm.officeDays} />, {firm.officeHours}
        </dd>
      </div>
    </dl>
  )
}
