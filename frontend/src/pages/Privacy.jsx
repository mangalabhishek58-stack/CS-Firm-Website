import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Detail from '../components/Detail.jsx'
import { firm } from '../data/firm.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

// Review this notice with the firm before publishing so it matches actual practice.
const LAST_UPDATED = '[Date of last update]'
const RETENTION_PERIOD = '[retention period]'

export default function Privacy() {
  usePageMeta('Privacy policy', `How ${firm.name} collects and uses information submitted through this website.`)

  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" />

      <section className="section">
        <div className="container prose prose--narrow">
          <p className="muted">
            Last updated: <Detail value={LAST_UPDATED} />
          </p>

          <p>
            This notice explains how {firm.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles information you share
            through this website.
          </p>

          <h2>Information we collect</h2>
          <p>When you submit the enquiry form, we collect:</p>
          <ul>
            <li>your full name and email address;</li>
            <li>your phone number, if you choose to provide it;</li>
            <li>the service you are interested in; and</li>
            <li>the message you write.</li>
          </ul>
          <p>
            Our server may also record basic technical information such as your IP address, briefly, to protect the
            form against spam and abuse. We do not use advertising or tracking cookies on this website.
          </p>

          <h2>How we use it</h2>
          <p>
            We use this information only to respond to your enquiry and, if you choose to engage us, to discuss and
            set up that engagement. We do not sell your information or share it with third parties for marketing.
          </p>
          <p>
            Enquiries are delivered to our inbox by email, so your details pass through our email service provider
            for that purpose only.
          </p>

          <h2>What not to send</h2>
          <p>
            Please do not send confidential documents, identity documents or sensitive personal information through
            the enquiry form. If documents are needed, we will agree a suitable way to share them.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep enquiry details for <Detail value={RETENTION_PERIOD} /> after our last contact with you, unless
            a longer period is needed for an engagement or required by law.
          </p>

          <h2>Your choices and requests</h2>
          <p>
            You can ask us to access, correct or delete the information you have shared with us. Email{' '}
            <a href={`mailto:${firm.email}`}>{firm.email}</a> with the subject &ldquo;Privacy request&rdquo; and we
            will respond within a reasonable time.
          </p>

          <h2>Changes to this notice</h2>
          <p>
            We may update this notice from time to time. The date at the top shows when it was last changed.
          </p>

          <p>
            <Link to="/contact">Contact us</Link> if you have any questions about this policy.
          </p>
        </div>
      </section>
    </>
  )
}
