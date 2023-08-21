import React from 'react'
import Balancer from 'react-wrap-balancer'
import styled from 'styled-components'

import arrow from '../img/hero/arrow.svg'
import cloud from '../img/hero/cloud.svg'
import desktop from '../img/hero/desktop.svg'
import lamp from '../img/hero/lamp.svg'
import mobile from '../img/hero/mobile.svg'
import { Container } from '../style'
import Customers from './Customers'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding-bottom: 0;
`

const ColHero = styled.div`
  padding-block: 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em 5%;

  div {
    flex: 4;
    text-align: center;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  p {
    font-weight: bold;
    margin: 0;
    line-height: 0.9em;
    text-align: center;
    color: #aaa;

    span {
      color: #3e3e3e;
    }
  }

  @media (min-width: 501px) {
    font-size: 0.9rem;
    padding-block: 4rem 2rem;

    padding-inline: 2rem;
    max-width: 640px;
    margin-inline: auto;
    display: flex;
    flex-direction: row;
  }
`
const Arrow = styled.img`
  margin-left: 10%;

  @media (max-width: 500px) {
    height: 6em !important;
    width: 200px;
    transform: rotate(90deg) scale(0.6) translateY(30px);
  }
`
const Apps = styled.div`
  flex: 2 !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1em, 5vw, 1.2em);
`
const ColTeaser = styled.div``

const TeaserTitle = styled.h1`
  font-size: 2.5em;
  margin: 1rem 0;
  color: black;
  line-height: 1em;

  @media (max-width: 380px) {
    font-size: 1.6rem;
  }
`
const TeaserText = styled.div`
  font-size: 1.2em;
  font-weight: 400;
  color: #aaaaaa;
  hyphens: auto;
`

const Hero = () => (
  <Section id="start">
    <Container>
      <ColHero>
        <div css="flex: 1.2 !important;">
          <img src={lamp} alt="" />
          <p>
            Ihre <span>Idee</span>
          </p>
        </div>
        <div css="flex: 2 !important;">
          <Arrow src={arrow} alt="" />
        </div>
        <Apps>
          <div>
            <img src={cloud} css="margin-inline: 10%;" alt="" />
            <p>
              Ihre <span>Web</span> App
            </p>
          </div>
          <div>
            <img src={desktop} css="margin-inline: 27%;" alt="" />
            <p>
              Ihre <span>Desktop</span> App
            </p>
          </div>
          <div>
            <img src={mobile} css="margin-inline: 35%;" alt="" />
            <p>
              Ihre <span>Mobile</span> App
            </p>
          </div>
        </Apps>
      </ColHero>
      <ColTeaser>
        <TeaserTitle>
          <Balancer>Software&shy;entwicklung in der Schweiz</Balancer>
        </TeaserTitle>

        <TeaserText>
          Zusammen mit Ihnen realisieren wir{' '}
          <a href="individuelle-entwicklung">individuelle Softwarelösungen.</a>
          <p>
            Wir entwickeln Mobile Apps sowie Web- und Desktopapplikationen und
            unterstützen Sie mit unserem Know How und unserer Erfahrung bei der
            Digitalisierung.
          </p>
          <p>
            Da wir auch für uns selbst Produkte und Softwarelösungen entwickeln,
            wissen wir, wie wichtig die Einhaltung von Vorgaben wie Kosten und
            Zielen für das Business ist.
          </p>
          <p>
            Unsere Software Entwicklung findet zu 100% in unserem Unternehmen in
            der Zentralschweiz statt. Unsere Softwareentwicklerinnen und
            Softwareentwickler arbeiten mit modernen Methoden, Technologien
            (z.B. künstliche Intelligenz) und Softwareentwicklungsprozessen und
            kennen sich bestens aus mit Daten und Projektmanagement.
          </p>
        </TeaserText>
      </ColTeaser>
    </Container>

    <div css="flex: 1; margin-top: 1em;" />
    <Customers />
  </Section>
)

export default Hero
