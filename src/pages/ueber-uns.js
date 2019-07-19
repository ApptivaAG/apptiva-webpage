import React from 'react'
import Helmet from 'react-helmet'
import { Container, Section } from '../style'
import { description, company } from '../config'

import Layout from '../components/Layout'
import Employees from '../components/Employees'
import SEO from '../components/SEO'

const metadata = {
  title: 'Jobs',
  description: 'Wir bieten Jobs für Erwachsene',
  slug: 'jobs',
}

const AboutUs = () => (
  <Layout>
    <main>
      <Helmet title={`Über uns - ${company}`} />
      <SEO metaData={metadata} />
      <Section>
        <Container>
          <h1>Über uns</h1>
          <p>{description}</p>
          <p>
            Wer sind wir, woher kommen wir, weshalb sind wir, wo sind wir
            (Büro-Foto)
          </p>
          <h2>Unser Team</h2>

          <p>
            Fotos mit mehr Tischen auch bei{' '}
            <a href="https://business.google.com/posts/l/04340041156497988688?hl=en">
              Google Business publizieren
            </a>
          </p>

          <a href="/">Zur Startseite</a>
        </Container>
      </Section>
      <Employees />
    </main>
  </Layout>
)

export default AboutUs
