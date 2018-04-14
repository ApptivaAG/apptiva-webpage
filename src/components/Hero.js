import React from 'react'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import styled from 'styled-components'

import heroImage from '../img/solution-collage.svg'
import logoSlogan from '../img/logo-slogan.svg'
import { FullWidth, Container, Button } from '../layouts/style'

const Logo = styled.img`
  margin: 3em 4rem 2em;
  height: 4em;
  width: 10em;
`
const Section = styled.section`
  height: 100vh;
  overflow-x: hidden;
`
const Columns = styled.div`
  display: flex;
  margin-right: 10%;
`
const HeroImage = styled.img`
  margin-right: 4rem;
`
const Teaser = styled.h1`
  color: #aaa;
  margin: 0 0 2rem;
  max-width: 24rem;
`
const Fat = styled.span`
  color: black;
`

export default () => (
  <Section>
    <Logo src={logoSlogan} alt="Apptiva - Passgenaue Softwarelösungen" />
    <FullWidth>
      <Columns>
        <HeroImage
          src={heroImage}
          alt="Erfolgreich umgesetzte Desktop, Mobile und Weblösungen"
        />
        <div>
          <Teaser>
            Hier kann schon bald Ihre{' '}
            <Fat>iOS, Android, Desktop oder Web-Applikation</Fat> stehen.
          </Teaser>
          <Button href="/#offerte">Offerte anfordern</Button>
        </div>
      </Columns>
    </FullWidth>
  </Section>
)

// export const startPageQuery = graphql`
//   query StartPage($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       frontmatter {
//         title
//         image
//       }
//     }
//     testimonials: allMarkdownRemark(
//       filter: { frontmatter: { templateKey: { eq: "testimonial-data" } } }
//     ) {
//       edges {
//         node {
//           id
//           ...Testimonial_details
//         }
//       }
//     }
//   }
// `
