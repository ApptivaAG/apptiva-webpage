import React from 'react'
import { Helmet } from 'react-helmet'
import { MainTitle, Container, Section } from '../style'
import SEO from '../components/SEO'
import config from '../config'
import Layout from '../components/Layout'

const metadata = {
  title: 'Jobs',
  description: `Jobs bei Apptiva.`,
  slug: 'jobs',
}

const Jobs = () => (
  <Layout>
    <main>
      <Helmet title={`Jobs - ${config.company}`} />
      <SEO metaData={metadata} />
      <Section>
        <Container>
          <MainTitle>Jobs</MainTitle>

          <h2 style={{ marginBottom: 0 }}>
            Zur Zeit haben wir keine offenen Stellen.
          </h2>
          <p>
            Wir freuen uns aber auch dann auf Deine Bewerbung, wenn keine
            Stellen vakant sind.
          </p>
          <p>
            Bitte sende Deine Initiativbewerbung an
            <a href="mailto:info@apptiva.ch?subject=Initiativbewerbung bei Apptiva">
              {' '}
              info@apptiva.ch
            </a>
          </p>
        </Container>
      </Section>
    </main>
  </Layout>
)

export default Jobs
