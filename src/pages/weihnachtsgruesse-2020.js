import React from 'react'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import {
  Button,
  Centered,
  Container,
  MainTitle,
  Right,
  Section,
} from '../style'
import { graphql, useStaticQuery } from 'gatsby'
import { Input, Textarea } from '../components/ContactForm'
import { Helmet } from 'react-helmet'
import SEO from '../components/SEO'
import config from '../config'

const query = graphql`
  query {
    xmas2020: file(
      absolutePath: { regex: "/weihnachtsgruesse-2020.png/" }
      sourceInstanceName: { eq: "images" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1920, toFormat: JPG) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

const metadata = {
  title: 'Weihnachtsgrüsse 2020',
  description:
    'Herzlichen Dank an alle die in irgend einer Form mit uns zusammen gearbeitet haben, in diesem ganz speziellen Jahr 2020.',
  slug: 'weihnachtsgruesse-2020',
}

const Weihnachtsgruesse2020 = () => {
  const { xmas2020 } = useStaticQuery(query)
  return (
    <Layout>
      <Container>
        <Helmet title={`Weihnachtsgrüsse 2020 - ${config.company}`} />
        <SEO metaData={metadata} />

        <Section css="padding-bottom: 0;">
          <MainTitle>Weihnachts&shy;grüsse 2020</MainTitle>
        </Section>
        <Section css="font-size: 1.8em; padding: 0;">
          <Img css="margin: 3em 0;" fluid={xmas2020.childImageSharp.fluid} />
          <p>
            <b>Herzlichen Dank</b> an alle die in irgend einer Form mit uns
            zusammen gearbeitet haben, in diesem ganz speziellen Jahr 2020.
          </p>
          <p>
            Hoffentlich ergibt sich auch im nächsten Jahr die Chance mit euch
            die Welt ein kleines bisschen besser zu machen. Wir wünschen euch
            allen <b>von Herzen frohe Weihnachten und ein gutes, neues Jahr</b>.
          </p>
        </Section>
        <Centered css="font-size: 4em;">
          <span role="img" aria-label="Xmas trees">
            🎄🎄🎄
          </span>
        </Centered>
        <Section>
          <h2>Hinterlasse einen Gruss</h2>
          <p>
            Hinterlasse einen Gruss an das Apptiva Team. Wir freuen uns sehr
            über alle Rückmeldungen!
          </p>
          <form
            name="greetings_2020"
            action="/gruss-erhalten/"
            method="POST"
            netlify
          >
            <div>
              <label htmlFor="name">Name</label>
              <Input type="text" name="name" id="name" />
            </div>
            <div>
              <label htmlFor="greeting">Gruss</label>
              <Textarea name="greeting" id="greeting" rows="10"></Textarea>
            </div>
            <Right>
              <Button type="submit">Gruss senden</Button>
            </Right>
          </form>
        </Section>
      </Container>
    </Layout>
  )
}
export default Weihnachtsgruesse2020
