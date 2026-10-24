import { useEffect } from 'react'
import { firm } from '../data/firm.js'

// Sets the document title and meta description for the current page.
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${firm.name}` : `${firm.name} | ${firm.tagline}, ${firm.city}`
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}
