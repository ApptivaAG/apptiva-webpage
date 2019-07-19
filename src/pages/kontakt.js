import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { company } from '../config'
import {
  Container as ContainerDefault,
  Section,
  Subtitle,
  Title,
} from '../style'
import Layout from '../components/Layout'
import ContactForm from '../components/ContactForm'
import SEO from '../components/SEO'

const Container = styled(ContainerDefault)`
  padding-top: 4em;
  padding-bottom: 12em;
`

const metadata = {
  title: 'Kontakt',
  description: 'Wir freuen uns auf Ihre Kontaktaufnahme.',
  slug: 'kontakt',
}

const Contact = () => (
  <Layout>
    <main>
      <Helmet title={`Kontakt - ${company}`} />
      <SEO metaData={metadata} />

      <Section id="kontakt">
        <Container>
          <Title>Kontakt</Title>
          <Subtitle>Wir freuen uns, von Ihnen zu hören.</Subtitle>
          Möchten Sie uns kennenlernen oder haben Sie Fragen zu unseren
          Dienstleistungen?
          <br />
          Zögern Sie nicht und nehmen Sie mit uns Kontakt auf!
          <ContactForm />
        </Container>
      </Section>
      <Section style={{ padding: 0, marginBottom: '-4rem' }}>
        <iframe
          loading="lazy"
          title="Google Maps"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?q=Apptiva AG, Neuenkirchstrasse 19, Sempach Station&amp;hl=de&amp;geocode=+&amp;hnear=Apptiva AG+Neuenkirchstrasse 19,+Sempach Station&amp;t=m&amp;z=10&amp;iwloc=A&amp;output=embed"
          width="100%"
          height="550px"
          frameBorder="0"
        />
      </Section>

      <Container>
        <h1>Kontakt</h1>
        <p>Unsere Koordinaten</p>
        <ul>
          <li>Adresse</li>
          <li>Tel</li>
          <li>Formular</li>
          <li>Google Maps</li>
          <li>
            Sitemap erstellen und ev.{' '}
            <a href="https://search.google.com/search-console/sitemaps?resource_id=https%3A%2F%2Fapptiva.ch%2F">
              hier{' '}
            </a>
            einreichen
          </li>
          <li>
            Sitelinks verbesser:{' '}
            <a href="https://support.google.com/webmasters/answer/47334?hl=de">
              hier
            </a>
          </li>
        </ul>
        <a href="/">Zur Startseite</a>
      </Container>
    </main>
  </Layout>
)

export default Contact
