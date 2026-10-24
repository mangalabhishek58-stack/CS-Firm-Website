import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import Button from './Button.jsx'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo onClick={closeMenu} />

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-toggle__bars" aria-hidden="true" />
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>

        <nav id="primary-nav" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Primary">
          <ul className="site-nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className="site-nav__link" onClick={closeMenu}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button to="/contact" className="site-nav__cta" onClick={closeMenu}>
            Enquire Now
          </Button>
        </nav>
      </div>
    </header>
  )
}
