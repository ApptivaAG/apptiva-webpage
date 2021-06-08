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
  flex: 6 1 24rem;

  @media (min-width: 381px) {
    margin-right: 3rem;
  }
`
const ColTeaser = styled.div`
  flex: 1 1 18rem;
  padding: 2rem 1rem;
`

const Teaser = styled.h2`
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
        absolutePath: { regex: "/solution-collage.png/" }
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
          <Teaser>
            Hier kann schon bald Ihre{' '}
            <Fat>iOS, Android, Desktop oder Web-Applikation</Fat> stehen.
          </Teaser>
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
              font-size: 0.6em;
              margin: 0 -1em;
              background: ${(p) => p.theme.color.lightBg};
              color: #666;
            `}
          >
            <StaticImage
              src="../img/mail9.png"
              width={100}
              alt="Apptiva Newsletter"
            />
            <p css="flex: 1 1 auto; font-weight: 600; margin: 0.5em  1em;">
              Bleiben Sie mit dem Apptiva Newsletter auf dem Laufenden. Jedes
              Quartal aktuelle Apptiva-News erhalten.
            </p>
            <div css="font-size: 0.9em; margin: 0.5em  1em;">
              <Button to="/newsletter/">Newsletter abonnieren</Button>
            </div>
          </div>
        </Container>
      </Info>
    </Section>
  )
}

export default Hero
