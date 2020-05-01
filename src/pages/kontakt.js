import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import { Container, Section, Button } from '../style'
import ContactForm from '../components/ContactForm'
import Seo from '../components/SEO'
import { Helmet } from 'react-helmet'
import config from '../config'

const Grid = styled.div`
  display: grid;
  margin-top: 4em;
  gap: 1em;

  p {
    margin: 0;
  }
  @media (min-width: 1024px) {
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
  font-weight: 500;
  margin-bottom: 1.4em !important;
`
const Address = styled.address`
  font-weight: 500;
  font-style: normal;
`

const query = graphql`
  query {
    buildingImage: file(
      absolutePath: { regex: "/gebaeude.jpg/" }
      sourceInstanceName: { eq: "images" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

const Kontakt = () => {
  const { buildingImage } = useStaticQuery(query)

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
          <h1>Kontakt</h1>
          <p>{metadata.description}</p>
          <Grid>
            <div css="pading-top: 2em;">
              <p>Telefon</p>
              <ContactInfo href="tel:+41413222626">041 322 26 26</ContactInfo>
              <p>Mail</p>
              <ContactInfo href="mailto:info@apptiva.ch">
                info@apptiva.ch
              </ContactInfo>
              <p>Adresse</p>
              <Address>
                Neuenkirchstrasse 19 <br />
                6203 Sempach Station
              </Address>
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
      <Img fluid={buildingImage.childImageSharp.fluid} />
      <Section dark id="anfahrt">
        <Container>
          <h2>Standort</h2>

          <p>
            Apptiva befindet sich in Sempach an der Autobahn A2 und an der
            Bahnlinie zwischen Luzern und Sursee.
          </p>
          <Address>
            Neuenkirchstrasse 19 <br />
            6203 Sempach Station
          </Address>

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
