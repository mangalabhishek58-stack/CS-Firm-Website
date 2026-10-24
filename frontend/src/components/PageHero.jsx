// Title band used at the top of inner pages.
export default function PageHero({ eyebrow, title, intro, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
        <h1 className="page-hero__title">{title}</h1>
        {intro && <p className="page-hero__intro">{intro}</p>}
        {children}
      </div>
    </section>
  )
}
