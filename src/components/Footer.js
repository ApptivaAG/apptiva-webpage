import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import { Container } from '../layouts/style'
import chevron from '../img/chevron.svg'

const year = new Date().getFullYear()

const Background = styled.div`
  padding: 3rem 0;
  color: white;
  background-color: #3d525c;
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
    grid-template-areas:
      'about contact links'
      'about social links'
      'company company company';
    grid-gap: 3rem;
  }
  ul {
    list-style-type: none;
    padding: 0;

    li {
      display: flex;
      padding: 0.4em 0;
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
          <li>Apptiva AG, Neuenkirchstrasse 19, 6203 Sempach Station</li>
          <li>041 322 26 26</li>
          <li>info@apptiva.ch</li>
          <li>www.apptiva.ch</li>
        </ul>
        <h2>Social Media</h2>
        <ul>
          <li>Twitter</li>
          <li>Xing</li>
          <li>LinkedIn</li>
          <li>Facebook</li>
          <li>Youtube</li>
        </ul>
      </Contact>
      <Links>
        <h2>Quick Links</h2>
        <ul>
          <li>
            <Link to="/blog/">Aktuelle Themen</Link>
          </li>
          <li>Warum Sie mit uns zusammenarbeiten sollten</li>
          <li>
            <a href="https://www.botfabrik.ch/">Die Botfabrik</a>
          </li>
          <li>
            <a href="http://www.webkiste.ch/">Wie Webkiste</a>
          </li>
          <li>
            <a href="http://www.digitalenterprise.ch/">
              Unser Partner Digital Enterprise
            </a>
          </li>
          <li>
            <a href="http://www.lean-enterprise-app.com/">
              Das Manifest der Lean Enterprise App
            </a>
          </li>
          <li>Unsere Kompetenzen</li>
          <li>Unser Vorgehen</li>
          <li>Impressum</li>
        </ul>
      </Links>
      <Company>© {year} Apptiva AG. Passgenaue Softwarelösungen.</Company>
    </Grid>
  </Background>
)

export default Footer
