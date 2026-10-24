// Editable service content. Each entry powers a card on /services and a
// detail page at /services/:slug. Keep descriptions general - they are not
// a substitute for advice on a specific situation.

export const services = [
  {
    slug: 'company-incorporation',
    title: 'Company & LLP Incorporation',
    summary:
      'Setting up a private limited company, one person company, LLP or Section 8 company, from name reservation to post-incorporation steps.',
    covers: [
      'Guidance on choosing a suitable business structure',
      'Name reservation through the MCA portal',
      'Drafting of the MoA and AoA, or the LLP agreement',
      'Incorporation filings (SPICe+ for companies, FiLLiP for LLPs)',
      'Coordination of digital signatures and director identification',
      'Post-incorporation steps such as the commencement of business filing and statutory registers',
    ],
    suitedFor: [
      'Founders starting a new business',
      'Proprietorships and partnerships moving to a company or LLP structure',
      'Non-profit initiatives considering a Section 8 company',
    ],
    // Official links shown on the detail page (ids from data/resources.js).
    resources: ['mca-portal', 'mca-acts-rules', 'gst-portal', 'income-tax-portal'],
  },
  {
    slug: 'annual-roc-compliance',
    title: 'Annual ROC Compliance',
    summary:
      'Keeping companies and LLPs up to date with their yearly filings with the Registrar of Companies.',
    covers: [
      'A compliance calendar tailored to your entity',
      'Filing of financial statements (AOC-4)',
      'Filing of the annual return (MGT-7 / MGT-7A)',
      'LLP annual filings (Form 8 and Form 11)',
      'Director KYC (DIR-3 KYC)',
      'Event-based filings such as auditor appointment (ADT-1) and DPT-3, where applicable',
    ],
    suitedFor: [
      'Private limited companies, OPCs and LLPs',
      'Businesses with pending or overdue ROC filings',
      'Teams that want one partner to track deadlines',
    ],
    // Official links shown on the detail page (ids from data/resources.js).
    resources: ['mca-portal', 'mca-acts-rules'],
  },
  {
    slug: 'secretarial-audit',
    title: 'Secretarial Audit',
    summary:
      'Secretarial audit under Section 204 of the Companies Act, 2013 for companies where it applies, and voluntary compliance reviews.',
    covers: [
      'Assessment of whether a secretarial audit applies to your company',
      'Review of compliance with the Companies Act, applicable SEBI regulations, FEMA and other relevant laws',
      'Review of board and committee processes and records',
      'Secretarial Audit Report in Form MR-3',
      'Observations and follow-up on corrective steps',
    ],
    suitedFor: [
      'Listed companies',
      'Public companies that meet the prescribed thresholds',
      'Companies that want an independent compliance health-check',
    ],
    // Official links shown on the detail page (ids from data/resources.js).
    resources: ['mca-acts-rules', 'icsi-secretarial-standards', 'sebi-regulations'],
  },
  {
    slug: 'board-and-general-meetings',
    title: 'Board & General Meetings',
    summary:
      'Planning and documenting board, committee and shareholder meetings in line with the Secretarial Standards.',
    covers: [
      'Notices, agendas and explanatory statements',
      'Drafting of board and shareholder resolutions',
      'Minutes in line with Secretarial Standards SS-1 and SS-2',
      'Filing of resolutions with the ROC (MGT-14) where required',
      'Maintenance of statutory registers',
    ],
    suitedFor: [
      'Companies without an in-house company secretary',
      'Boards that want clear, well-kept records',
    ],
    // Official links shown on the detail page (ids from data/resources.js).
    resources: ['icsi-secretarial-standards', 'mca-acts-rules'],
  },
  {
    slug: 'fema-rbi-compliance',
    title: 'FEMA & RBI Compliance',
    summary:
      'Reporting and documentation for foreign investment and overseas transactions under the Foreign Exchange Management Act.',
    covers: [
      'Foreign investment reporting on the FIRMS portal (FC-GPR, FC-TRS)',
      'Annual Return on Foreign Liabilities and Assets (FLA)',
      'Documentation and reporting for overseas direct investment',
      'Support with late submission and compounding matters',
    ],
    suitedFor: [
      'Indian companies with foreign shareholders',
      'Startups raising funds from overseas investors',
      'Businesses investing outside India',
    ],
    // Official links shown on the detail page (ids from data/resources.js).
    resources: ['rbi-firms', 'rbi-master-directions', 'rbi-fema'],
  },
  {
    slug: 'corporate-changes-restructuring',
    title: 'Corporate Changes & Restructuring',
    summary:
      'Handling changes to a company’s structure, capital or particulars, and supporting restructuring or closure.',
    covers: [
      'Change of name, registered office or objects',
      'Increase in authorised capital and allotment of shares',
      'Appointment and resignation of directors',
      'Conversions such as private to public company, or company to LLP',
      'Support on mergers, amalgamations and strike-off',
    ],
    suitedFor: [
      'Growing businesses bringing in new shareholders or directors',
      'Groups reorganising their entities',
      'Companies planning to close an inactive entity',
    ],
    // Official links shown on the detail page (ids from data/resources.js).
    resources: ['mca-portal', 'mca-acts-rules'],
  },
  {
    slug: 'sebi-listing-compliance',
    title: 'SEBI & Listing Compliance',
    summary:
      'Ongoing compliance support for listed entities and companies preparing to list.',
    covers: [
      'Periodic filings under the SEBI (LODR) Regulations, 2015',
      'Corporate governance reports and disclosures',
      'Insider trading (PIT Regulations) compliance',
      'Disclosures under the SAST Regulations',
      'Coordination with stock exchanges',
    ],
    suitedFor: [
      'Companies listed on the main board or SME platforms',
      'Companies preparing for a listing',
    ],
    // Official links shown on the detail page (ids from data/resources.js).
    resources: ['sebi-regulations', 'bse', 'nse'],
  },
]

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug)
}
