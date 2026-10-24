import Button from '../components/Button.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

export default function NotFound() {
  usePageMeta('Page not found', 'The page you are looking for could not be found.')

  return (
    <section className="section not-found">
      <div className="container not-found__inner">
        <p className="not-found__code" aria-hidden="true">404</p>
        <h1 className="not-found__title">We couldn&rsquo;t find that page</h1>
        <p>The link may be out of date, or the page may have moved.</p>
        <div className="not-found__actions">
          <Button to="/">Back to Home</Button>
          <Button to="/services" variant="secondary">View services</Button>
        </div>
      </div>
    </section>
  )
}
