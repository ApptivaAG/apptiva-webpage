const withMDX = require('@next/mdx')()
const { withPlausibleProxy } = require('next-plausible')

/**
 * @type {import('next').NextConfig}
 */
const config = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/blog': ['./content/blog/**/*'],
    },
    taint: true,
  },
  redirects,
}

module.exports = withPlausibleProxy()(withMDX(config))

async function redirects() {
  return [
    {
      source: '/web-app-datenschutz',
      destination: '/blog/web-app-datenschutz',
      permanent: true,
    },
    {
      source: '/neujahrsessen-apptiva-2024',
      destination: '/blog/neujahrsessen-mit-der-apptiva',
      permanent: true,
    },
    {
      source: '/schnittstellen-programmieren',
      destination: '/blog/bedeutung-der-schnittstellen-programmierung',
      permanent: true,
    },
    {
      source: '/vorteile-der-app-entwicklung-in-der-schweiz',
      destination: '/blog/fuenf-vorteile-der-app-entwicklung-in-der-schweiz',
      permanent: true,
    },
    {
      source: '/apptiva-geburtstagsgeschenke-2023',
      destination: '/blog/apptiva-geburtstagsgeschenke-2023',
      permanent: true,
    },
    {
      source: '/suva-slope-track-app-update-23-24',
      destination: '/blog/suva-slope-track-app-update-23-24',
      permanent: true,
    },
    {
      source: '/apps-erp-api-schnittstellen-verbinden',
      destination: '/blog/apps-erp-api-schnittstellen-verbinden',
      permanent: true,
    },
    {
      source: '/fallstricke-software-schnittstellen',
      destination: '/blog/fallstricke-software-schnittstellen',
      permanent: true,
    },
    {
      source: '/apptiva-team-event-langenthal',
      destination: '/blog/apptiva-team-event-langenthal',
      permanent: true,
    },
    {
      source: '/der-frischling-im-homeoffice',
      destination: '/blog/der-frischling-im-homeoffice',
      permanent: true,
    },
    {
      source: '/app-entwicklung-in-der-schweiz-vorteile-gegenueber-offshore',
      destination:
        '/blog/app-entwicklung-in-der-schweiz-vorteile-gegenueber-offshore',
      permanent: true,
    },
    {
      source: '/wie-teuer-ist-ein-produktkonfigurator',
      destination: '/blog/wie-teuer-ist-ein-produktkonfigurator',
      permanent: true,
    },
    {
      source: '/app-erstellen-schweiz',
      destination: '/blog/app-erstellen-schweiz',
      permanent: true,
    },
    {
      source: '/produktkonfiguratoren-bestehende-webshops-integrieren',
      destination:
        '/blog/produktkonfiguratoren-bestehende-webshops-integrieren',
      permanent: true,
    },
    {
      source: '/wo-produkt-konfiguratoren-einsetzen',
      destination: '/blog/wo-produkt-konfiguratoren-einsetzen',
      permanent: true,
    },
    {
      source: '/apptiva-team-event-maerz-23',
      destination: '/blog/apptiva-team-event-maerz-23',
      permanent: true,
    },
    {
      source: '/dies-macht-einen-erfolgreichen-produkt-konfigurator-aus',
      destination:
        '/blog/dies-macht-einen-erfolgreichen-produkt-konfigurator-aus',
      permanent: true,
    },
    {
      source: '/entwicklung-produkt-konfiguratoren',
      destination: '/blog/entwicklung-produkt-konfiguratoren',
      permanent: true,
    },
    {
      source: '/gaston-ist-jetzt-payflink',
      destination: '/blog/gaston-ist-jetzt-payflink',
      permanent: true,
    },
    {
      source: '/5-tipps-für-erfolgreiche-workation',
      destination: '/blog/5-tipps-für-erfolgreiche-workation',
      permanent: true,
    },
    {
      source: '/apptiva-neuer-standort',
      destination: '/blog/apptiva-neuer-standort',
      permanent: true,
    },
    {
      source: '/apptiva-team-event-mai-22',
      destination: '/blog/apptiva-team-event-mai-22',
      permanent: true,
    },
    {
      source:
        '/so-lernen-kunden-unser-vorgehen-software-entwicklung-kennen-und-schaetzen',
      destination:
        '/blog/so-lernen-kunden-unser-vorgehen-software-entwicklung-kennen-und-schaetzen',
      permanent: true,
    },
    {
      source: '/suva-slope-track-app-update-2022',
      destination: '/blog/suva-slope-track-app-update-2022',
      permanent: true,
    },
    {
      source:
        '/konfigurierbare-event-angebote-verkaufen-und-per-qr-code-einloesen',
      destination:
        '/blog/konfigurierbare-event-angebote-verkaufen-und-per-qr-code-einloesen',
      permanent: true,
    },
    {
      source: '/so-werden-wir-bessere-entwicklerinnen',
      destination: '/blog/so-werden-wir-bessere-entwicklerinnen',
      permanent: true,
    },
    { source: '/solarify', destination: '/blog/solarify', permanent: true },
    {
      source: '/vor-und-nachteile-apple-ios-google-android-app-webapp-pwa',
      destination:
        '/blog/vor-und-nachteile-apple-ios-google-android-app-webapp-pwa',
      permanent: true,
    },
    {
      source: '/fleet-assistant-hostettler-autotechnik-ag',
      destination: '/blog/fleet-assistant-hostettler-autotechnik-ag',
      permanent: true,
    },
    {
      source: '/1-jahr-home-office--traum-oder-albtraum',
      destination: '/blog/1-jahr-home-office--traum-oder-albtraum',
      permanent: true,
    },
    {
      source: '/suva-slope-track-app-update-2021',
      destination: '/blog/suva-slope-track-app-update-2021',
      permanent: true,
    },
    {
      source: '/neuer-vivanco-webshop',
      destination: '/blog/neuer-vivanco-webshop',
      permanent: true,
    },
    {
      source: '/erste-schritte-in-der-informatik',
      destination: '/blog/erste-schritte-in-der-informatik',
      permanent: true,
    },
    {
      source: '/vr-anwendungsbeispiele',
      destination: '/blog/vr-anwendungsbeispiele',
      permanent: true,
    },
    {
      source: '/apptiva-5',
      destination: '/blog/apptiva-5',
      permanent: true,
    },
    {
      source: '/screenimage-pro',
      destination: '/blog/screenimage-pro',
      permanent: true,
    },
    {
      source: '/erfahrungen-mit-electron-webview',
      destination: '/blog/erfahrungen-mit-electron-webview',
      permanent: true,
    },
    {
      source: '/unsere-erfahrungen-mit-postfinance-e-payment-service',
      destination: '/blog/unsere-erfahrungen-mit-postfinance-e-payment-service',
      permanent: true,
    },
    {
      source: '/softwareentwicklung-unter-nixos',
      destination: '/blog/softwareentwicklung-unter-nixos',
      permanent: true,
    },
    {
      source:
        '/die-dynamik-von-g-kraeften-betriebssystemen-und-neuen-teammitgliedern',
      destination:
        '/blog/die-dynamik-von-g-kraeften-betriebssystemen-und-neuen-teammitgliedern',
      permanent: true,
    },
    {
      source: '/suva-slope-track-app',
      destination: '/blog/suva-slope-track-app',
      permanent: true,
    },
    {
      source: '/datenmodell-eines-chatbots-testen',
      destination: '/blog/datenmodell-eines-chatbots-testen',
      permanent: true,
    },
    {
      source: '/bubblechat-ist-da',
      destination: '/blog/bubblechat-ist-da',
      permanent: true,
    },
    {
      source: '/app-store-eintrag-details-ueberblick',
      destination: '/blog/app-store-eintrag-details-ueberblick',
      permanent: true,
    },
    {
      source: '/die-apptiva-waechst',
      destination: '/blog/die-apptiva-waechst',
      permanent: true,
    },
    {
      source: '/mit-einem-chatbot-rapportieren',
      destination: '/blog/mit-einem-chatbot-rapportieren',
      permanent: true,
    },
    {
      source: '/serverless',
      destination: '/blog/serverless',
      permanent: true,
    },
    { source: '/pwa-apps', destination: '/blog/pwa-apps', permanent: true },
    {
      source: '/sacralis-app',
      destination: '/blog/sacralis-app',
      permanent: true,
    },
    {
      source: '/bubblechat',
      destination: '/blog/bubblechat',
      permanent: true,
    },
    {
      source: '/trial-store',
      destination: '/blog/trial-store',
      permanent: true,
    },
    { source: '/vsponse', destination: '/blog/vsponse', permanent: true },
    {
      source: '/werkausstellung',
      destination: '/blog/werkausstellung',
      permanent: true,
    },
    {
      source: '/drei-jahre-apptiva',
      destination: '/blog/drei-jahre-apptiva',
      permanent: true,
    },
    {
      source: '/usability-audit',
      destination: '/blog/usability-audit',
      permanent: true,
    },
    {
      source: '/partyplaner-fuer-schuerch-getraenke',
      destination: '/blog/partyplaner-fuer-schuerch-getraenke',
      permanent: true,
    },
    {
      source: '/wir-sind-in-die-startup-station-umgezogen',
      destination: '/blog/wir-sind-in-die-startup-station-umgezogen',
      permanent: true,
    },
    {
      source: '/bots-holzoepfel-ond-zipfelchappe',
      destination: '/blog/bots-holzoepfel-ond-zipfelchappe',
      permanent: true,
    },
    {
      source: '/jest-test-debuggen-mit-visual-studio-code',
      destination: '/blog/jest-test-debuggen-mit-visual-studio-code',
      permanent: true,
    },
    {
      source: '/amazon-lambda-zusammen-mit-dem-serverless-framework',
      destination: '/blog/amazon-lambda-zusammen-mit-dem-serverless-framework',
      permanent: true,
    },
    {
      source: '/allianz-cinema-chatbot',
      destination: '/blog/allianz-cinema-chatbot',
      permanent: true,
    },
    {
      source: '/suva-schneesport-check',
      destination: '/blog/suva-schneesport-check',
      permanent: true,
    },
    {
      source: '/react-komponenten-mit-chrome-timeline-analysieren',
      destination: '/blog/react-komponenten-mit-chrome-timeline-analysieren',
      permanent: true,
    },
    {
      source: '/chatbot-entwickeln-mit-react-redux-wit-ai-und-slack-teil-1',
      destination:
        '/blog/chatbot-entwickeln-mit-react-redux-wit-ai-und-slack-teil-1',
      permanent: true,
    },
    {
      source: '/bot-entwicklung',
      destination: '/blog/bot-entwicklung',
      permanent: true,
    },
    {
      source: '/mwst-startups',
      destination: '/blog/mwst-startups',
      permanent: true,
    },
    {
      source: '/1-jahr-apptiva',
      destination: '/blog/1-jahr-apptiva',
      permanent: true,
    },
    {
      source:
        '/it-landschaft-einer-organisation-langfristig-positiv-beeinflussen',
      destination:
        '/blog/it-landschaft-einer-organisation-langfristig-positiv-beeinflussen',
      permanent: true,
    },
    {
      source: '/mehr-ueberblick-mit-storymap',
      destination: '/blog/mehr-ueberblick-mit-storymap',
      permanent: true,
    },
    {
      source: '/digitale-kluft',
      destination: '/blog/digitale-kluft',
      permanent: true,
    },
    {
      source: '/stakeholder-interviews',
      destination: '/blog/stakeholder-interviews',
      permanent: true,
    },
    {
      source: '/geschaeftsprozesse-beschleunigen',
      destination: '/blog/geschaeftsprozesse-beschleunigen',
      permanent: true,
    },
    {
      source: '/qualitaetsziele',
      destination: '/blog/qualitaetsziele',
      permanent: true,
    },
    {
      source: '/eine-moderne-ui-architektur',
      destination: '/blog/eine-moderne-ui-architektur',
      permanent: true,
    },
    {
      source: '/anwender-im-vordergrund',
      destination: '/blog/anwender-im-vordergrund',
      permanent: true,
    },
    {
      source: '/warum-apptiva',
      destination: '/blog/warum-apptiva',
      permanent: true,
    },
    {
      source: '/der-digitale-wandel',
      destination: '/blog/der-digitale-wandel',
      permanent: true,
    },
    {
      source: '/bargeldlos-bezahlen',
      destination: '/angebot/development',
      permanent: true,
    },
    {
      source: '/bubble-chat',
      destination: '/angebot/chatbots',
      permanent: true,
    },
    {
      source: '/architektur-review',
      destination: '/angebot/architektur-review',
      permanent: true,
    },
    {
      source: '/chatbots',
      destination: '/angebot/chatbots',
      permanent: true,
    },
    {
      source: '/custom-dashboard',
      destination: '/projekte/notaufnahme-dashboard-inselspital',
      permanent: true,
    },
    {
      source: '/dashboard-notaufnahme',
      destination: '/projekte/notaufnahme-dashboard-inselspital',
      permanent: true,
    },
    {
      source: '/digitalisierung-unternehmen',
      destination: '/angebot/development/digitalisierung',
      permanent: true,
    },
    {
      source: '/einsatzplanung',
      destination: '/projekte/einsatzplanung-gebaeudeunterhalt',
      permanent: true,
    },
    {
      source: '/individuelle-entwicklung',
      destination: '/angebot/development',
      permanent: true,
    },
    {
      source: '/payflink',
      destination: '/projekte/restaurant-bestell-app-payflink',
      permanent: true,
    },
    {
      source: '/persona-workshop',
      destination: '/angebot/persona-workshop',
      permanent: true,
    },
    {
      source: '/produktkonfiguratoren',
      destination: '/angebot/development/konfiguratoren',
      permanent: true,
    },
    {
      source: '/schnittstellen-entwickeln',
      destination: '/angebot/development/schnittstellen',
      permanent: true,
    },
    {
      source: '/unterstuetzung',
      destination: '/ueber-uns',
      permanent: true,
    },
    {
      source: '/unsere-kompetenzen',
      destination: '/angebot/development/unsere-kompetenzen',
      permanent: true,
    },
    {
      source: '/telefonverkauf-showcase',
      destination: '/angebot/development',
      permanent: true,
    },
    {
      source: '/mobile-apps-ios-android',
      destination: '/angebot/development/app-entwicklung',
      permanent: true,
    },
    {
      source: '/user-centered-design',
      destination: '/angebot/user-centered-design-workshop',
      permanent: true,
    },
    {
      source: '/web-apps',
      destination: '/angebot/development/webentwicklung',
      permanent: true,
    },
    {
      source: '/einzigartiger-webshop',
      destination: '/angebot/development/webshops',
      permanent: true,
    },
    {
      source: '/zusammenarbeit',
      destination: '/ueber-uns',
      permanent: true,
    },
    {
      source: '/weiterentwicklung-apps-produkte',
      destination: '/angebot/development/weiterentwicklung',
      permanent: true,
    },
    { source: '/brigitte-wey', destination: '/ueber-uns', permanent: true },
    { source: '/carla-iten', destination: '/ueber-uns', permanent: true },
    {
      source: '/kevin-rickenbach',
      destination: '/ueber-uns',
      permanent: true,
    },
    {
      source: '/markus-tanner',
      destination: '/ueber-uns',
      permanent: true,
    },
    { source: '/david-decker', destination: '/ueber-uns', permanent: true },
    { source: '/patrik-stutz', destination: '/ueber-uns', permanent: true },
    {
      source: '/philip-schoenholzer',
      destination: '/ueber-uns',
      permanent: true,
    },
    {
      source: '/linus-huesler',
      destination: '/ueber-uns',
      permanent: true,
    },
    {
      source: '/robin-geissmann',
      destination: '/ueber-uns',
      permanent: true,
    },
    {
      source: '/roman-schaller',
      destination: '/ueber-uns',
      permanent: true,
    },
    {
      source: '/sarah-schneider',
      destination: '/ueber-uns',
      permanent: true,
    },
    {
      source: '/digital-enterprise',
      destination: '/ueber-uns',
      permanent: true,
    },
    { source: '/dox42', destination: '/ueber-uns', permanent: true },
    { source: '/swisscom', destination: '/ueber-uns', permanent: true },
    { source: '/cashctrl', destination: '/ueber-uns', permanent: true },
    {
      source: '/flm-kassensysteme',
      destination: '/ueber-uns',
      permanent: true,
    },
    {
      source: '/referenzen/chatbot-schweizerische-post',
      destination: '/projekte/chatbot-die-schweizerische-post',
      permanent: true,
    },
    {
      source: '/referenzen/fleet-assistant-hostettler-autotechnik',
      destination: '/projekte/webapplikation-hostettler-autotechnik',
      permanent: true,
    },
    {
      source: '/referenzen/leoba',
      destination: '/projekte/web-und-mobile-leoba',
      permanent: true,
    },
    {
      source: '/referenzen/screenimage-pro',
      destination: '/projekte/screenimage-pro',
      permanent: true,
    },
    {
      source: '/referenzen/suva-slope-track-app',
      destination: '/projekte/suva-slope-track-app',
      permanent: true,
    },
    {
      source: '/referenzen/package-configurator-grand-casino-bern',
      destination: '/projekte/softwareloesung-grand-casino-bern',
      permanent: true,
    },
    {
      source: '/referenzen/partyplaner',
      destination: '/projekte/partyplaner-schuerch-getraenke',
      permanent: true,
    },
    {
      source: '/referenzen/vivanco-webshops',
      destination: '/projekte/webshops-vivanco',
      permanent: true,
    },
    {
      source: '/referenzen/emil',
      destination: '/projekte/monitoring-system-konzept5',
      permanent: true,
    },
    {
      source: '/referenzen/diluna',
      destination: '/projekte/diluna',
      permanent: true,
    },
    {
      source: '/referenzen/trial-store-app-webshop-globus',
      destination: '/projekte/trial-store-app-und-webshop-globus',
      permanent: true,
    },
    {
      source: '/referenzen/hbtec-app',
      destination: '/projekte/mobile-app-hbtec',
      permanent: true,
    },
    {
      source: '/referenzen/vsponse-bewerbungsvideos-plattform',
      destination: '/projekte/bewerbungsplattform-v-sponse',
      permanent: true,
    },
    {
      source: '/referenzen/energierechner-mein-verbrauch',
      destination: '/projekte/energierechner-nnz',
      permanent: true,
    },
    {
      source: '/referenzen/hbtec-viewer',
      destination: '/projekte/electron-applikation-hbtec',
      permanent: true,
    },
    {
      source: '/referenzen/kran-doku-app-welti-furrer',
      destination: '/projekte/pwa-app-welti-furrer',
      permanent: true,
    },
    {
      source: '/referenzen/holz-art',
      destination: '/projekte/konfigurator-schreinerei-holz-art',
      permanent: true,
    },
    { source: '/jobs', destination: '/ueber-uns', permanent: true },
    { source: '/referenzen', destination: '/projekte', permanent: true },
    {
      source: '/vorgehen',
      destination: '/angebot/development/projektumsetzung',
      permanent: true,
    },
    {
      source: '/vorgehensweise',
      destination: '/angebot/development/projektumsetzung',
      permanent: true,
    },
    {
      source: '/apptiva-lernt/tailwindcss/',
      destination: '/apptiva-lernt/tailwind-css',
      permanent: true,
    },
    { source: '/newsletter', destination: '/', permanent: true },
  ]
}
