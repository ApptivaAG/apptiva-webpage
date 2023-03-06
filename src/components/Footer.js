import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { description, knowledgeRoute } from '../config'

import { Container, Button } from '../style'
import chevron from '../img/chevron.svg'
import TrackingPreview from './TrackingPreview'

const year = new Date().getFullYear()

const Background = styled.footer`
  padding: 3rem 0 1rem;
  color: white;
  background-color: ${(props) => props.theme.color.darkGray};
  font-size: 0.8rem;
`

const Grid = styled(Container)`
  display: grid;
  grid-template-areas:
    'about'
    'services'
    'products'
    'contact'
    'social'
    'company';

  @media (min-width: 860px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'about services products '
      'about contact social '
      'company company company';
    grid-gap: 1rem 6rem;
  }
  ul {
    list-style-type: none;
    padding: 0;

    li {
      display: flex;
    }
  }
`
const LinkStyle = styled.div`
  a {
    font-weight: 200;
    text-decoration: underline;
    color: inherit;
    &:visited {
      color: inherit;
    }
  }
  .arrow-links a {
    display: flex;
    padding: 0.4em 0;
    font-weight: 500;
    text-decoration: none;
    &:hover,
    &:active {
      color: ${(props) => props.theme.color.secondary};
    }

    &:before {
      content: url(${chevron});
      flex: 1 0 auto;
      font-size: 1em;
      height: 1em;
      width: 0.6em;
      padding-top: 0.15em;
      margin-right: 0.6em;
      transition: transform 0.2s;
    }
    &:hover :before {
      transform: translate(4px);
    }

    @media (max-width: 1020px) {
      padding: 0.8em 0;
    }
  }
`
const About = styled.div`
  grid-area: about;
`
const Contact = styled.div`
  grid-area: contact;
`
const Social = styled.div`
  grid-area: social;
`
const Services = styled.div`
  grid-area: services;
`
const Products = styled.div`
  grid-area: products;
`
const Company = styled.div`
  padding-top: 1rem;
  grid-area: company;
  text-align: center;
`

const Newsletter = styled.div`
  margin-top: 3em;
  a {
    text-decoration: none;
  }
`

const Footer = () => (
  <Background>
    <LinkStyle>
      <Grid>
        <About>
          <h2>Über Apptiva</h2>
          <p>{description}</p>
          <Newsletter>
            <h3>Jedes Quartal aktuelle News erhalten</h3>
            <Button to="/newsletter/">Newsletter abonnieren</Button>
          </Newsletter>
        </About>
        <Contact className="arrow-links">
          <h2>Apptiva</h2>
          <ul>
            <li>
              <Link to="/kontakt/">Kontakt</Link>
            </li>
            <li>
              <Link to="/ueber-uns/">Über uns</Link>
            </li>
            <li>
              <Link to="/ueber-uns/#team">Team</Link>
            </li>
            <li>
              <Link to="/jobs/">Jobs</Link>
            </li>
            <li>
              <Link to={`/${knowledgeRoute}/`}>Apptiva lernt</Link>
            </li>
          </ul>
        </Contact>
        <Social className="arrow-links">
          <h2>Social Media</h2>
          <ul>
            <li>
              <a
                href="https://twitter.com/ApptivaTeam"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.xing.com/companies/apptivaag"
                target="_blank"
                rel="noopener noreferrer"
              >
                Xing
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/apptiva-ag"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/apptivaag"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCkRetskswz9I4-ohcYuTG3Q"
                target="_blank"
                rel="noopener noreferrer"
              >
                Youtube
              </a>
            </li>
          </ul>
        </Social>
        <Services className="arrow-links">
          <h2>Entwicklung</h2>
          <ul>
            <li>
              <Link to="/individuelle-entwicklung/">
                Individuelle Softwareentwicklung
              </Link>
            </li>
            <li>
              <Link to="/mobile-apps-ios-android/">
                Mobile Apps für iOS und Android
              </Link>
            </li>
            <li>
              <Link to="/web-apps/">Web-Apps und Applikationen</Link>
            </li>
            <li>
              <Link to="/chatbots/">Chatbots</Link>
            </li>
            <li>
              <Link to="/produktkonfiguratoren/">Produktkonfiguratoren</Link>
            </li>
            <li>
              <Link to="/digitalisierung-unternehmen/">
                Digitale Transformation
              </Link>
            </li>
            <li>
              <Link to="/unterstuetzung/">
                Unterstützung in Softwareprojekten
              </Link>
            </li>
          </ul>
        </Services>
        <Products className="arrow-links">
          <h2>Produkte</h2>
          <ul>
            <li>
              <Link to="/dashboard-notaufnahme/">
                Dashboard für die Notaufnahme
              </Link>
            </li>
            <li>
              <Link to="/einsatzplanung/">
                Einsatzplanung für den Gebäudeunterhalt
              </Link>
            </li>
            <li>
              <Link to="/guestcounter/">Gästezähler</Link>
            </li>
            <li>
              <Link to="/payflink/">Payflink - Restaurant Bestell App</Link>
            </li>
            <li>
              <a
                href="https://bubble-chat.ch"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bubble Chat - KI-basierte Chatbot Lösung
              </a>
            </li>
          </ul>
        </Products>

        <Company>
          <span role="img" aria-label="All rights reserved.">
            ©
          </span>{' '}
          2015 - {year} Apptiva AG. Passgenaue Softwarelösungen.{' '}
          <Link to="/impressum/">Impressum</Link>&ensp;|&ensp;
          <TrackingPreview />
        </Company>
      </Grid>
    </LinkStyle>
  </Background>
)

export default Footer
