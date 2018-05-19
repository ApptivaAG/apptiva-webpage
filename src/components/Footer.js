import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import { Container } from '../layouts/style'
import chevron from '../img/chevron.svg'

const year = new Date().getFullYear()

const Background = styled.footer`
  margin-top: 4rem;
  padding: 3rem 0 1rem;
  color: white;
  background-color: ${props => props.theme.color.darkGray};
  font-size: 0.8rem;
`

const Grid = Container.extend`
  display: grid;
  grid-template-areas:
    'about'
    'contact'
    'social'
    'links'
    'company';

  @media (min-width: 860px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'about contact links'
      'about social links'
      'company company company';
    grid-gap: 1rem 3rem;
  }
  ul {
    list-style-type: none;
    padding: 0;

    li {
      display: flex;
    }

    li::before {
      content: url(${chevron});
      height: 1em;
      width: 0.4em;
      margin-right: 1em;
    }
  }
  a {
    color: inherit;
    &:visited {
      color: inherit;
    }
    &:hover,
    &:active {
      color: ${props => props.theme.color.secondary};
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
const Links = styled.div`
  grid-area: links;
`
const Company = styled.div`
  padding-top: 1rem;
  grid-area: company;
  text-align: center;
`

const Footer = () => (
  <Background>
    <Grid>
      <About>
        <h2>Über Apptiva</h2>
        <p>
          Die Apptiva AG ist auf das Erstellen von kundenindividuellen
          Softwarelösungen spezialisiert. Damit unterstützt sie Unternehmen bei
          der Digitalisierung und bei der Beschleunigung ihrer
          Geschäftsprozesse. Die Apptiva AG setzt dazu modernste Technologien
          und Methodiken ein, um schlanke und passgenaue Lösungen zu liefern.
        </p>
      </About>
      <Contact>
        <h2>Kontakt</h2>
        <ul>
          <li>
            <a
              href="https://www.google.com/maps/place/Apptiva+AG/@47.1127346,8.192777,17z/data=!3m1!4b1!4m5!3m4!1s0x4790201d7af9f115:0xa30a7ef7decd53b5!8m2!3d47.112731!4d8.194971"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apptiva AG<br />Neuenkirchstrasse 19<br />6203 Sempach Station
            </a>
          </li>
          <li>
            <a
              href="tel:+41413222626"
              target="_blank"
              rel="noopener noreferrer"
            >
              041 322 26 26
            </a>
          </li>
          <li>
            <a href="mailto:info@apptiva.ch">info@apptiva.ch</a>
          </li>
          <li>
            <Link to="/">www.apptiva.ch</Link>
          </li>
        </ul>
      </Contact>
      <Social>
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
      <Links>
        <h2>Quick Links</h2>
        <ul>
          <li>
            <Link to="/blog/">Blog</Link>
          </li>
          <li>
            <Link to="/zusammenarbeit">
              Warum Sie mit uns zusammenarbeiten sollten
            </Link>
          </li>
          <li>
            <a
              href="https://www.botfabrik.ch/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Die Botfabrik
            </a>
          </li>
          <li>
            <a
              href="http://www.webkiste.ch/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wie Webkiste
            </a>
          </li>
          <li>
            <a
              href="http://www.digitalenterprise.ch/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unser Partner Digital Enterprise
            </a>
          </li>
          <li>
            <a
              href="http://www.lean-enterprise-app.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Das Manifest der Lean Enterprise App
            </a>
          </li>
          <li>
            <Link to="/unsere-kompetenzen">Unsere Kompetenzen</Link>
          </li>
          <li>
            <Link to="/vorgehensweise">Unser Vorgehen</Link>
          </li>
          <li>
            <Link to="/impressum">Impressum</Link>
          </li>
        </ul>
      </Links>
      <Company>
        <span role="img" aria-label="All rights reserved.">
          ©
        </span>{' '}
        {year} Apptiva AG. Passgenaue Softwarelösungen.
      </Company>
    </Grid>
  </Background>
)

export default Footer
