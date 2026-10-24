import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import Detail from './Detail.jsx'
import { firm } from '../data/firm.js'
import { services } from '../data/services.js'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo inverted />
          <p>
            Company secretarial, governance and regulatory compliance support for companies and LLPs, based in{' '}
            {firm.city}.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="site-footer__heading">Quick links</h2>
          <ul className="site-footer__list">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy policy</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="site-footer__heading">Services</h2>
          <ul className="site-footer__list">
            {services.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="site-footer__heading">Contact</h2>
          <ul className="site-footer__list">
            <li><a href={`tel:${firm.phoneLink}`}>{firm.phoneDisplay}</a></li>
            <li><a href={`mailto:${firm.email}`}>{firm.email}</a></li>
            <li><Detail value={firm.address} /></li>
            <li>{firm.officeHours}</li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>
          © {year} {firm.name}. <Detail value={firm.registration} />
        </p>
        <p>The information on this website is general in nature and is not professional advice.</p>
      </div>
    </footer>
  )
}
