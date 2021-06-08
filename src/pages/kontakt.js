import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'
import { Helmet } from 'react-helmet'

import Layout from '../components/Layout'
import { Container, Section, Button, MainTitle } from '../style'
import ContactForm from '../components/ContactForm'
import Seo from '../components/SEO'
import config from '../config'

const Grid = styled.div`
  display: grid;
  margin-top: 2em;
  gap: 1em;

  p {
    margin: 1.2em 0 0 0;
  }
  @media (min-width: 800px) {
    grid: 1fr / 1fr 2fr;

    div + div {
      padding-left: 2em;
      border-left: 1px solid #ddd;
      padding-bottom: 2em;
    }
  }
`
const ContactInfo = styled.a`
  display: block;
  font-weight: bold;
  font-style: normal;
`

const Kontakt = () => {
  const metadata = {
    title: 'Kontakt',
    description: `Möchten Sie uns kennenlernen oder haben Sie Fragen zu unseren
      Dienstleistungen? Zögern Sie nicht und nehmen Sie mit uns Kontakt
      auf!`,
    slug: 'kontakt',
  }
  return (
    <Layout callToAction={false}>
      <Helmet title={`${metadata.title} - ${config.company}`} />
      <Seo metaData={metadata} />
      <Section>
        <Container>
          <MainTitle>Kontakt</MainTitle>
          <p>{metadata.description}</p>
          <Grid>
            <div>
              <p>Telefon</p>
              <ContactInfo href="tel:+41413222626">041 322 26 26</ContactInfo>
              <p>Mail</p>
              <ContactInfo href="mailto:info@apptiva.ch">
                info@apptiva.ch
              </ContactInfo>
              <p>Adresse</p>
              <ContactInfo as="address">
                Apptiva AG <br /> Neuenkirchstrasse 19 <br />
                6203 Sempach Station
              </ContactInfo>
              <Button css="font-size: 0.7em; margin-top: 1em;" href="#anfahrt">
                Anfahrt
              </Button>
            </div>
            <div>
              <h2>Kontaktformular</h2>
              <ContactForm />
            </div>
          </Grid>
        </Container>
      </Section>
      <StaticImage
        src="../img/gebaeude.jpg"
        alt="Gebäude wo sich unser Büro befindet."
      />
      <Section dark id="anfahrt">
        <Container>
          <h2>Standort</h2>

          <p>
            Apptiva befindet sich in Sempach an der Autobahn A2 und an der
            Bahnlinie zwischen Luzern und Sursee.
          </p>
          <ContactInfo as="address">
            Apptiva AG <br />
            Neuenkirchstrasse 19 <br />
            6203 Sempach Station
          </ContactInfo>

          <iframe
            css="margin-top: 3em;"
            title="Google Maps"
            frameBorder="0"
            height="550px"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            src="https://maps.google.com/maps?q=Apptiva%20AG,%20Neuenkirchstrasse%2019,%20Sempach%20Station&hl=de&geocode=+&hnear=Apptiva%20AG+Neuenkirchstrasse%2019,+Sempach%20Station&t=m&z=10&iwloc=A&output=embed"
            width="100%"
          />
        </Container>
      </Section>
    </Layout>
  )
}

export default Kontakt
