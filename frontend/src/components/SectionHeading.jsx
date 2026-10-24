export default function SectionHeading({ eyebrow, title, intro, as: Tag = 'h2', align = 'left', id }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id} className="section-heading__title">
        {title}
      </Tag>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </div>
  )
}
