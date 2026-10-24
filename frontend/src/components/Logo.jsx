import { Link } from 'react-router-dom'
import { firm } from '../data/firm.js'

// Demo logo mark - replace with the firm's approved logo when available.
export default function Logo({ inverted = false, onClick }) {
  return (
    <Link to="/" className={`logo${inverted ? ' logo--inverted' : ''}`} onClick={onClick}>
      <svg className="logo__mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <rect width="40" height="40" rx="8" className="logo__bg" />
        <path d="M9 11l6.5 18h1L23 11" className="logo__stroke" />
        <path d="M21 29l6-18 6 18M23.6 23h6.8" className="logo__stroke logo__stroke--accent" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">{firm.name}</span>
        <span className="logo__tagline">{firm.tagline}</span>
      </span>
    </Link>
  )
}
