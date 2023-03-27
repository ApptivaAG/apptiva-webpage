import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

import logoSlogan from '../img/logo-slogan.svg'
import svgData from '../img/collage.svg'
import { Button, Container as CntnrDefault } from '../style'
import Customers from './Customers'

const Container = styled(CntnrDefault)`
  box-sizing: border-box;
  width: 100%;

  @media (min-width: 600px) {
    max-width: 1080px;
    padding-left: 3em;
    padding-right: 3em;
  }
`

const Logo = styled.img`
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
`
const ColHero = styled.div`
  flex: 1 1 24rem;

  @media (min-width: 381px) {
    margin-right: 3rem;
    margin-bottom: 2rem;
  }
`
const ColTeaser = styled.div`
  flex: 1 1 18rem;
  padding: 1vw 2rem 1rem;
`

const TeaserTitle = styled.h2`
  font-size: 1.8em;
  margin: 1rem 0;
  max-width: 24rem;
  color: black;
  hyphens: none;

  @media (max-width: 380px) {
    font-size: 1.4rem;
  }
`
const TeaserText = styled.div`
  font-size: 1.2em;
  font-weight: 400;
  color: #aaaaaa;
  margin: 0 0 2rem;
  hyphens: auto;
`

const Info = styled.div`
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  color: ${(p) => p.theme.color.darkGray};
  background-color: ${(p) => p.theme.color.lightBg};

  h3 {
    margin: 0;
    color: ${(p) => p.theme.color.text};
  }
`

const Hero = () => {
  const images = useStaticQuery(graphql`
    {
      hero: file(
        absolutePath: { regex: "/collage.png/" }
        sourceInstanceName: { eq: "images" }
      ) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
        }
      }
    }
  `)

  return (
    <Section id="start">
      <Container>
        <Columns css="justify-content: space-between; align-items: center; margin: 2em 0;">
          <h1
            css={`
              flex: 1 0 10em;
              font-size: 1em;
              @media (max-width: 599px) {
                text-align: center;
              }
            `}
          >
            <Logo
              height="200"
              width="80"
              src={logoSlogan}
              alt="Apptiva - Passgenaue Softwarelösungen"
            />
          </h1>
        </Columns>
      </Container>

      <Columns css="@media (min-width: 640px) {margin-right: 10%;}">
        <ColHero>
          <GatsbyImage
            style={{ background: `url("${svgData}")` }}
            imgStyle={{ backgroundColor: 'white' }}
            image={images.hero.childImageSharp.gatsbyImageData}
            alt="Erfolgreich umgesetzte Desktop, Mobile und Weblösungen"
          />
        </ColHero>
        <ColTeaser>
          <TeaserTitle>
            Erfolgreiche Entwicklung von digitalen Produkten
          </TeaserTitle>
          <TeaserText>
            Zusammen mit Ihnen realisieren wir{' '}
            <a href="individuelle-entwicklung">
              individuelle Softwarelösungen.
            </a>
            <br />
            Wir entwickeln Mobile Apps sowie Web- und Desktopapplikationen und
            unterstützen Sie bei der Digi&shy;talisierung.
          </TeaserText>
          <Button href="/#dienstleistungen">Unser Angebot</Button>
        </ColTeaser>
      </Columns>

      <div css="flex: 1; margin-top: 3em;" />
      <Customers />

      <Info>
        <Container>
          <div
            css={`
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              font-size: 0.8em;
              gap: 0.5rem 1rem;
            `}
          >
            <div>
              <h3>
                Wir suchen: <a href="/jobs">Fullstack-Entwickler:in</a>
              </h3>
              <p css="margin:0;">
                Gleich bewerben und einen der besten
                Software&shy;entwicklung-Jobs schnappen.
              </p>
            </div>
            <div css="font-size: 0.9em; margin-left: auto;">
              <Button to="/jobs/">Jetzt bewerben</Button>
            </div>
          </div>
        </Container>
      </Info>
    </Section>
  )
}

export default Hero
