import type { ProfessionalService, WithContext } from 'schema-dts'

export const organizationSchema: WithContext<ProfessionalService> = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://apptiva.ch/#organization',

  name: 'Apptiva AG',
  url: 'https://apptiva.ch',
  logo: 'https://apptiva.ch/img/Logo-symbol.png',
  image: 'https://apptiva.ch/img/apptiva-office.jpg',

  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Obergrundstrasse 73',
    addressLocality: 'Luzern',
    postalCode: '6003',
    addressCountry: 'CH',
  },
  telephone: '+41 41 322 26 26',
  email: 'info@apptiva.ch',

  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.04367488136289,
    longitude: 8.303964941746337,
  },

  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    areaServed: 'CH',
    availableLanguage: ['de', 'en'],
  },

  sameAs: [
    'https://linkedin.com/company/apptiva-ag/',
    'https://github.com/ApptivaAG',
  ],
}
