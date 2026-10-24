import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ExternalLink from '../components/ExternalLink.jsx'
import CtaStrip from '../components/CtaStrip.jsx'
import { firm } from '../data/firm.js'
import { getResourcesByGroup, resourceGroups, RESOURCES_LAST_CHECKED } from '../data/resources.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

export default function Resources() {
  usePageMeta(
    'Resources',
    'Links to official sources for the Companies Act, LLP Act, FEMA, SEBI regulations, Secretarial Standards and government filing portals.'
  )

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Acts, forms and official links"
        intro="Quick links to the official websites for the laws, standards and filing portals that company secretarial work relies on."
      />

      {resourceGroups.map((group, index) => (
        <section
          key={group.id}
          className={`section${index % 2 === 1 ? ' section--tinted' : ''}`}
          aria-labelledby={`resources-${group.id}`}
        >
          <div className="container">
            <SectionHeading id={`resources-${group.id}`} title={group.title} intro={group.intro} />
            <ul className="resource-grid">
              {getResourcesByGroup(group.id).map((resource) => (
                <li key={resource.id} className="resource-card">
                  <h3 className="resource-card__title">
                    <ExternalLink href={resource.url} className="resource-card__link">
                      {resource.title}
                    </ExternalLink>
                  </h3>
                  <p className="resource-card__description">{resource.description}</p>
                  <p className="resource-card__domain">{new URL(resource.url).hostname.replace(/^www\./, '')}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="section section--compact">
        <div className="container">
          <p className="disclaimer">
            These links go to official government, regulator and professional body websites. {firm.name} is not
            responsible for their content, and laws, forms and portals change over time - always check the latest
            version on the official site. Links last checked: {RESOURCES_LAST_CHECKED}.
          </p>
        </div>
      </section>

      <CtaStrip title="Need help with a filing or a compliance question?" />
    </>
  )
}
