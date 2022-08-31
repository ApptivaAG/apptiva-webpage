import React from 'react'
import { navigate } from 'gatsby'
import GoogleTag from '../components/GoogleTag'

import Layout from '../components/Layout'
import Seo from '../components/SEO'
import { Button, Container, Section } from '../style'

const FormularGesendet = ({ location }) => {
  const metadata = {
    title: 'Formular gesendet',
    description: `Vielen Danke für Ihre Kontaktaufnahme.`,
    slug: location.pathname,
  }
  return (
    <Layout callToAction={false}>
      <GoogleTag />
      <Seo metaData={metadata} />
      <Section>
        <Container>
          <h1>Danke!</h1>
          <p>
            Wir haben Ihre Nachricht erhalten und melden uns so bald wie möglich
            bei Ihnen.
          </p>
          <p>
            <Button type="button" onClick={() => navigate(-1)}>
              Zurück
            </Button>
          </p>
        </Container>
      </Section>
    </Layout>
  )
}

export default FormularGesendet
