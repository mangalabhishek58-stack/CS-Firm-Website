// Central firm details. Edit here and every page updates.
// Values wrapped in [square brackets] are placeholders and are highlighted on
// the site until real, verified details replace them.

export const firm = {
  name: 'Vibhor Associates',
  tagline: 'Company Secretaries',
  city: 'Delhi',
  address: '[Full office address], Delhi',
  phoneDisplay: '+91 63782 32525',
  phoneLink: '+916378232525',
  email: 'mangalabhishek12@gmail.com',
  officeHours: '10:00 AM – 6:00 PM',
  officeDays: '[Working days]',
  registration: '[ICSI firm registration / membership number]',
  // Set to a Google Maps link once the exact office address is confirmed.
  mapUrl: null,
}

// DEMO profile: replace with verified details before the site goes live.
export const founder = {
  isDemo: true,
  name: 'Vibhor Jain',
  role: 'Founder',
  qualification: '[Qualification and ICSI membership number]',
  bio: [
    'Vibhor Jain founded Vibhor Associates to give businesses a dependable, ' +
      'single point of contact for company secretarial and compliance work.',
    'He works with founders, directors and finance teams on incorporations, ' +
      'annual filings, board processes and regulatory changes, with an emphasis ' +
      'on clear communication and timely follow-through.',
  ],
}

export function isPlaceholder(value) {
  return typeof value === 'string' && /\[.+\]/.test(value)
}
