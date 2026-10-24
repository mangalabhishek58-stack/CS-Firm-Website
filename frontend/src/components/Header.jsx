import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import Button from './Button.jsx'
import { services } from '../data/services.js'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef(null)
  const servicesToggleRef = useRef(null)

  const closeAll = () => {
    setMenuOpen(false)
    setServicesOpen(false)
  }

  // Escape closes the services dropdown first, then the mobile menu.
  useEffect(() => {
    if (!menuOpen && !servicesOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      if (servicesOpen) {
        setServicesOpen(false)
        servicesToggleRef.current?.focus()
      } else {
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, servicesOpen])

  // Clicking or tabbing outside the dropdown closes it.
  useEffect(() => {
    if (!servicesOpen) return undefined
    const onOutside = (event) => {
      if (!servicesRef.current?.contains(event.target)) setServicesOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('focusin', onOutside)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('focusin', onOutside)
    }
  }, [servicesOpen])

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo onClick={closeAll} />

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
            <li>
              <NavLink to="/" end className="site-nav__link" onClick={closeAll}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="site-nav__link" onClick={closeAll}>
                About
              </NavLink>
            </li>
            <li ref={servicesRef} className={`site-nav__item--has-menu${servicesOpen ? ' is-open' : ''}`}>
              <div className="site-nav__split">
                <NavLink to="/services" className="site-nav__link" onClick={closeAll}>
                  Services
                </NavLink>
                <button
                  ref={servicesToggleRef}
                  type="button"
                  className="submenu-toggle"
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  onClick={() => setServicesOpen((open) => !open)}
                >
                  <span className="submenu-toggle__chevron" aria-hidden="true" />
                  <span className="visually-hidden">Show services list</span>
                </button>
              </div>
              <div id="services-menu" className="submenu">
                <ul className="submenu__list">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <NavLink to={`/services/${service.slug}`} className="submenu__link" onClick={closeAll}>
                        {service.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <Link to="/services" className="submenu__all" onClick={closeAll}>
                  View all services →
                </Link>
              </div>
            </li>
            <li>
              <NavLink to="/resources" className="site-nav__link" onClick={closeAll}>
                Resources
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="site-nav__link" onClick={closeAll}>
                Contact
              </NavLink>
            </li>
          </ul>
          <Button to="/contact" className="site-nav__cta" onClick={closeAll}>
            Enquire Now
          </Button>
        </nav>
      </div>
    </header>
  )
}
