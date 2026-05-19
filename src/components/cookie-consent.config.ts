import type { CookieConsentConfig } from 'vanilla-cookieconsent'

/**
 * vanilla-cookieconsent configuration with German translations and two
 * categories: necessary (always on) and analytics (requires consent).
 */
export const cookieConsentConfig: CookieConsentConfig = {
  categories: {
    necessary: {
      enabled: true,
      readOnly: true,
    },
    analytics: {},
  },

  language: {
    default: 'de',
    translations: {
      de: {
        consentModal: {
          title: 'Wir verwenden Cookies',
          description:
            'Wir nutzen Cookies und ähnliche Technologien, um unsere Website zu verbessern und Werbung zu personalisieren. Notwendige Cookies sind für den Betrieb der Website erforderlich. Analyse-Cookies helfen uns, das Nutzungsverhalten besser zu verstehen und unsere Dienstleistungen zu verbessern. Mehr Informationen finden Sie in unserer <a href="/datenschutzerklaerung" class="cc__link">Datenschutzerklärung</a>.',
          acceptAllBtn: 'Alle akzeptieren',
          acceptNecessaryBtn: 'Nur notwendige',
          showPreferencesBtn: 'Einstellungen',
          footer:
            '<a href="/datenschutzerklaerung" class="cc__link">Datenschutzerklärung</a>',
        },
        preferencesModal: {
          title: 'Cookie-Einstellungen',
          acceptAllBtn: 'Alle akzeptieren',
          acceptNecessaryBtn: 'Nur notwendige',
          savePreferencesBtn: 'Auswahl speichern',
          closeIconLabel: 'Schließen',
          serviceCounterLabel: 'Dienst|Dienste',
          sections: [
            {
              title: 'Notwendige Cookies',
              description:
                'Diese Cookies sind für den einwandfreien Betrieb der Website erforderlich und können nicht deaktiviert werden.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Analyse & Werbung',
              description:
                'Diese Cookies erlauben es uns, die Nutzung der Website zu analysieren und personalisierte Werbung über Google Ads zu schalten. Die Daten werden an Google LLC in den USA übertragen. Rechtsgrundlage ist Ihre Einwilligung gemäss Art. 6 Abs. 1 lit. a DSGVO.',
              linkedCategory: 'analytics',
              cookieTable: {
                headers: { name: 'Cookie', domain: 'Domain', desc: 'Beschreibung' },
                body: [
                  {
                    name: '_ga, _ga_*',
                    domain: 'google.com',
                    desc: 'Google Analytics – Unterscheidung von Besuchern (2 Jahre)',
                  },
                  {
                    name: '_gcl_au',
                    domain: 'google.com',
                    desc: 'Google Ads – Conversion-Tracking (90 Tage)',
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
}
