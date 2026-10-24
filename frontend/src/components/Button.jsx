import { Link } from 'react-router-dom'

// Renders a router Link (to), an external link (href) or a <button>.
export default function Button({ to, href, variant = 'primary', className = '', children, ...props }) {
  const classes = `btn btn--${variant} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
