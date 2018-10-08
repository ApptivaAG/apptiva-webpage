import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Title, Container, Subtitle, Button } from '../layouts/style'
import SEO from '../components/SEO'
import config from '../config'

const metadata = {
  title: 'Jobs',
  description: 'Die besten Jobs in der Software-Entwicklung.',
  path: 'jobs',
}

const Searching = styled.h4`
  text-align: center;
  /* padding-top: 1em; */
  font-size: 3em;
  font-weight: 100;
`
const Layout = styled.div`
  text-align: center;
  padding-top: 1em;
`

export default () => (
  <main>
    <Helmet title={`Jobs - ${config.company}`} />
    <SEO metaData={metadata} />
    <Container>
      <Title>Jobs</Title>
      <Subtitle>{metadata.description}</Subtitle>

      <Searching>Wir suchen</Searching>

      <h2
        style={{
          marginBottom: 0,
        }}
      >
        Fullstack Software-EntwicklerIn und UnternehmerIn
      </h2>
      <small>100%, ab sofort</small>

      <h3>Deine Stärken</h3>

      <ul>
        <li>Teamfähig und selbständig</li>
        <li>Entscheidungsfreudig</li>
        <li>Schnelle Auffassungsgabe</li>
        <li>Freude in unterschiedlichen Tätigkeitsgebieten zu wirken</li>
        <li>Gewiefte Schreiberin / Gewiefter Schreiber</li>
        <li>Gier dich weiterzuentwickeln</li>
        <li>Voller Ideen und Tatendrang</li>
      </ul>

      <h3>Deine fachlichen Fähigkeiten</h3>

      <ul>
        <li>Dein Programmier-Beitrag führt schnell zum gewünschten Outcome</li>
        <li>
          Du magst mit HTML, CSS, JS in nützlicher Frist ansprechende
          Oberflächen entwickeln
        </li>
        <li>Du weisst, wie man mit Git in einem Team arbeitet</li>
        <li>Du möchtest mit Node.js, React und Java entwickeln</li>
      </ul>

      <h3>Deine Vorteile</h3>

      <ul>
        <li>Du wirst nicht mehr wie ein Kind behandelt</li>
        <li>
          Du entscheidest über deine Tätigkeiten, deine Arbeitszeiten, deine
          Ferienzeit und deinen Lohn
        </li>
        <li>Du arbeitest mit den besten Software-Entwicklern zusammen</li>
        <li>
          Du arbeitest an spannenden Projekten wie Chatbots oder einem
          Partyplaner
        </li>
        <li>Du verwendest moderne Tools und Libraries</li>
        <li>
          Du erlebst ein selbstorganisierendes Unternehmen am eigenen Leibe
        </li>
      </ul>

      <p>
        Überzeug uns mit deiner Bewerbung! Willst du mehr Erfahren? Dann ruf uns
        an! Wir freuen uns von dir zu hören.
      </p>
      <Layout>
        <Button href="mailto:info@apptiva.ch">Bewirb dich</Button>
      </Layout>
    </Container>
  </main>
)
