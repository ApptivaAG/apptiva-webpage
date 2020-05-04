import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { description } from '../config'

import { Container, Button } from '../style'
import chevron from '../img/chevron.svg'
import coronavirus from '../img/coronavirus.svg'

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

const Footer = () => (
  <Background>
    <LinkStyle>
      <Grid>
        <About>
          <h2>Über Apptiva</h2>
          <p>{description}</p>
          <div
            css={`
              margin-top: 5em;
              flex: 1 1 auto;
              font-size: 0.7em;
              background: #e4e4e4;
              color: #333;
            `}
          >
            <img
              css="display:block; padding-top: 1em; height: 2.4em;"
              src={coronavirus}
              alt=""
            />
            <p css="margin-bottom: 0; margin-top: 0; padding: 0.8em 1em; font-weight: 600;">
              Trotz Coronavirus arbeiten wir an allen Projekten in
              Vollbesetzung.
            </p>
            <div css="font-size: 0.9em; padding: 0 1em 1em; text-align: right; color: white;">
              <Button to="/coronavirus">Coronavirus bei Apptiva</Button>
            </div>
          </div>
        </About>
        <Contact className="arrow-links">
          <h2>Kontakt</h2>
          <ul>
            <li>
              <Link to="/kontakt/#anfahrt">
                Apptiva AG
                <br />
                Neuenkirchstrasse 19
                <br />
                6203 Sempach Station
              </Link>
            </li>
            <li>
              <a href="tel:+41413222626">041 322 26 26</a>
            </li>
            <li>
              <a href="mailto:info@apptiva.ch">info@apptiva.ch</a>
            </li>
            <li>
              <Link to="/">www.apptiva.ch</Link>
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
              <Link to="/individuelle-entwicklung/">Applikationen</Link>
            </li>
            <li>
              <Link to="/mobile-apps-ios-android/">iOS- und Android-Apps</Link>
            </li>
            <li>
              <Link to="/web-apps/">Web-Apps</Link>
            </li>
            <li>
              <Link to="/einzigartiger-webshop/">Webshops</Link>
            </li>
            <li>
              <Link to="/produktkonfiguratoren/">Produktkonfiguratoren</Link>
            </li>
            <li>
              <Link to="/chatbots/">Chatbots</Link>
            </li>
            <li>
              <Link to="/digitalisierung-unternehmen-corona/">
                Digitale Transformation
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
              <a
                href="https://gastonsolution.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gaston - Digitale Speisekarte
              </a>
            </li>
            <li>
              <a
                href="https://bubblecms.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bubble CMS - Manage Chatbot Content
              </a>
            </li>
          </ul>
        </Products>

        <Company>
          <span role="img" aria-label="All rights reserved.">
            ©
          </span>{' '}
          2015 - {year} Apptiva AG. Passgenaue Softwarelösungen.{' '}
          <Link to="/impressum">Impressum</Link>
        </Company>
      </Grid>
    </LinkStyle>
  </Background>
)

export default Footer
