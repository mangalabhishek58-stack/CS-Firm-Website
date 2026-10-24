// Official external links shown on /resources and on service detail pages.
// Link to official sources only, and prefer section pages over direct PDF
// links, which break more often. Re-check links periodically and update
// RESOURCES_LAST_CHECKED when you do.

export const RESOURCES_LAST_CHECKED = 'October 2026'

export const resourceGroups = [
  {
    id: 'acts',
    title: 'Acts, rules and regulations',
    intro: 'Official sources for the laws, rules and standards behind company secretarial compliance.',
  },
  {
    id: 'portals',
    title: 'Filing portals and forms',
    intro: 'Government portals used for company, LLP, foreign investment and tax filings.',
  },
  {
    id: 'regulators',
    title: 'Regulators and professional bodies',
    intro: 'Regulators, stock exchanges and the professional body for Company Secretaries.',
  },
]

export const resources = [
  // Acts, rules and regulations
  {
    id: 'mca-acts-rules',
    group: 'acts',
    title: 'Acts & Rules – Ministry of Corporate Affairs',
    description: 'The Companies Act, 2013, the LLP Act, 2008 and the rules made under them.',
    url: 'https://www.mca.gov.in/content/mca/global/en/acts-rules.html',
  },
  {
    id: 'india-code',
    group: 'acts',
    title: 'India Code',
    description: 'The official repository of central Acts. Search for an Act by name to read its current text.',
    url: 'https://indiacode.gov.in/',
  },
  {
    id: 'icsi-secretarial-standards',
    group: 'acts',
    title: 'Secretarial Standards – ICSI',
    description: 'Secretarial Standards issued by ICSI, including SS-1 (Board meetings) and SS-2 (General meetings).',
    url: 'https://www.icsi.edu/knowledgebase/secretarial-standards',
  },
  {
    id: 'sebi-regulations',
    group: 'acts',
    title: 'SEBI Regulations',
    description: 'Current SEBI regulations, including LODR, Prohibition of Insider Trading and SAST.',
    url: 'https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=3&smid=0',
  },
  {
    id: 'rbi-fema',
    group: 'acts',
    title: 'FEMA notifications – Reserve Bank of India',
    description: 'Notifications and regulations issued under the Foreign Exchange Management Act, 1999.',
    url: 'https://www.rbi.org.in/Scripts/Fema.aspx',
  },
  {
    id: 'rbi-master-directions',
    group: 'acts',
    title: 'Master Directions – Reserve Bank of India',
    description: 'Consolidated RBI directions, including Foreign Investment in India and Overseas Investment.',
    url: 'https://www.rbi.org.in/Scripts/BS_ViewMasterDirections.aspx',
  },

  // Filing portals and forms
  {
    id: 'mca-portal',
    group: 'portals',
    title: 'MCA portal',
    description: 'Company and LLP e-forms such as SPICe+, AOC-4, MGT-7 and DIR-3 KYC, plus company master data.',
    url: 'https://www.mca.gov.in/',
  },
  {
    id: 'rbi-firms',
    group: 'portals',
    title: 'FIRMS portal – Reserve Bank of India',
    description: 'Foreign investment reporting, including Form FC-GPR and Form FC-TRS.',
    url: 'https://firms.rbi.org.in/',
  },
  {
    id: 'gst-portal',
    group: 'portals',
    title: 'GST portal',
    description: 'GST registration, returns and payments.',
    url: 'https://www.gst.gov.in/',
  },
  {
    id: 'income-tax-portal',
    group: 'portals',
    title: 'Income Tax e-filing portal',
    description: 'PAN and TAN services, income tax returns and related filings.',
    url: 'https://www.incometax.gov.in/iec/foportal/',
  },

  // Regulators and professional bodies
  {
    id: 'rbi',
    group: 'regulators',
    title: 'Reserve Bank of India',
    description: 'India’s central bank and the regulator for foreign exchange matters.',
    url: 'https://www.rbi.org.in/',
  },
  {
    id: 'sebi',
    group: 'regulators',
    title: 'Securities and Exchange Board of India (SEBI)',
    description: 'The regulator for securities markets and listed companies.',
    url: 'https://www.sebi.gov.in/',
  },
  {
    id: 'icsi',
    group: 'regulators',
    title: 'The Institute of Company Secretaries of India (ICSI)',
    description: 'The statutory professional body for Company Secretaries in India.',
    url: 'https://www.icsi.edu/',
  },
  {
    id: 'bse',
    group: 'regulators',
    title: 'BSE',
    description: 'Stock exchange – listing compliance filings and corporate announcements.',
    url: 'https://www.bseindia.com/',
  },
  {
    id: 'nse',
    group: 'regulators',
    title: 'National Stock Exchange (NSE)',
    description: 'Stock exchange – listing compliance filings and corporate announcements.',
    url: 'https://www.nseindia.com/',
  },
]

export function getResourcesByGroup(groupId) {
  return resources.filter((resource) => resource.group === groupId)
}

export function getResourcesByIds(ids = []) {
  return ids.map((id) => resources.find((resource) => resource.id === id)).filter(Boolean)
}
