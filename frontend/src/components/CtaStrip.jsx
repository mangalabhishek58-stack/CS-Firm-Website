import Button from './Button.jsx'
import { firm } from '../data/firm.js'

export default function CtaStrip({
  title = 'Have a compliance question or a deadline coming up?',
  text = 'Tell us briefly what you need and we will get back to you to discuss the next steps.',
}) {
  return (
    <section className="cta-strip" aria-labelledby="cta-strip-title">
      <div className="container cta-strip__inner">
        <div>
          <h2 id="cta-strip-title" className="cta-strip__title">{title}</h2>
          <p className="cta-strip__text">{text}</p>
        </div>
        <div className="cta-strip__actions">
          <Button to="/contact" variant="light">Enquire Now</Button>
          <Button href={`tel:${firm.phoneLink}`} variant="outline-light">Call {firm.phoneDisplay}</Button>
        </div>
      </div>
    </section>
  )
}
