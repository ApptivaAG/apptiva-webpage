import React from 'react'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import styled, { keyframes } from 'styled-components'

import heroImage from '../img/solution-collage.svg'
import logoSlogan from '../img/logo-slogan.svg'
import { FullWidth, Container, Button } from '../layouts/style'

const Logo = styled.img`
  margin: 3em 4rem 2em;
  height: 4em;
  width: 10em;
`
const Section = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`
const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 10%;
`
const ColHero = styled.div`
  flex: 6 1 24rem;
  margin-right: 3rem;
`
const ColTeaser = styled.div`
  flex: 1 1 18rem;
  padding: 2rem 1rem;
`
const HeroImage = styled.img`
  /* flex: 4 1 24rem; */
  height: 100%;
  width: 100%;
  min-width: 0;
  min-height: 0;

  @media (min-width: 381px) {
    margin-right: 3rem;
  }
`
const Teaser = styled.h1`
  color: #aaa;
  margin: 0 0 2rem;
  max-width: 24rem;

  @media (max-width: 380px) {
    font-size: 1.4rem;
  }
`
const Fat = styled.span`
  color: black;
`
const ArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  @media (max-width: 380px) {
    display: none;
  }
`
const Arrow = styled.a`
  margin-bottom: 1.9rem;
  padding: 0.5em 0.7em;
  border-radius: 50%;
  font-weight: 800;
  color: white;
  background-color: ${props => props.theme.color.primary};
  transition: transform 30ms ease-out;
  transform: translate3d(0, 0, 0);
  overflow: hidden;

  &:hover {
    transform: translate3d(0, -1px, 0);
  }

  &:active {
    transform: translateY(1px);
  }
`
const Slide = keyframes`
  from {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
  53% {
    opacity: 0;
  }

  60% {
    opacity: 0;
    transform: translate3d(0,2rem,0);
  }

  to {
    opacity: 0;
    transform: translate3d(0,2rem,0);
    
  }
`
const AnimatedArrow = styled.svg`
  width: 1em;
  height: 1em;
  animation: ${Slide} 2s cubic-bezier(0.87, -0.24, 0.77, 0.34) infinite;
`

export default () => (
  <Section>
    <Logo src={logoSlogan} alt="Apptiva - Passgenaue Softwarelösungen" />

    <Columns>
      <ColHero>
        <HeroImage
          src={heroImage}
          alt="Erfolgreich umgesetzte Desktop, Mobile und Weblösungen"
        />
      </ColHero>
      <ColTeaser>
        <Teaser>
          Hier kann schon bald Ihre{' '}
          <Fat>iOS, Android, Desktop oder Web-Applikation</Fat> stehen.
        </Teaser>
        <Button href="/#offerte">Offerte anfordern</Button>
      </ColTeaser>
    </Columns>

    <ArrowContainer>
      <Arrow href="/#dienstleistungen">
        <AnimatedArrow viewBox="0 0 16 10">
          <path
            d="M 2 2 L 8 8 L 14 2"
            fill="transparent"
            stroke="white"
            strokeWidth="2"
          />
        </AnimatedArrow>
      </Arrow>
    </ArrowContainer>
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
