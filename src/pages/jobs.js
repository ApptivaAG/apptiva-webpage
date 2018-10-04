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
        Fullstack Software-Entwicklerin / -Entwickler
      </h2>
      <small>100%, ab sofort</small>

      <h3>Deine Stärken</h3>

      <ul>
        <li>Teamfähig und selbständig</li>
        <li>Entscheidungsfreudig</li>
        <li>Schnelle Auffassungsgabe</li>
        <li>
          Freude in unterschiedlichen Tätigkeitsgebieten zu wirken (Comb shaped)
        </li>
        <li>Gewifte Schreiberin / Gewifter Schreiber</li>
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
        <li>Umgang mit Git-SCM in einem Team ist dir bekannt</li>
        <li>Node.js und oder Java kennen ist von Vorteil</li>
        <li>React kennen ist von Vorteil</li>
      </ul>

      <h3>Deine Vorteile</h3>

      <ul>
        <li>Werde nicht mehr wie ein Kind behandelt</li>
        <li>
          Du entscheidest über deine Tätigkeiten, dein Arbeitszeiten, deine
          Ferienzeit und dein Lohn
        </li>
        <li>Arbeite mit den besten Software-Entwicklern zusammen</li>
        <li>
          Arbeite an spannenden Projekten wie Chatbots oder einem Partyplaner
        </li>
        <li>Arbeite mit den modernsten Tools und Libraries</li>
        <li>Erlebe ein selbstorganisierendes Unternehmen am eigenen Leibe</li>
      </ul>

      <p>
        Bewerbe dich jetzt mit Motivationsschreiben, Lebenslauf, Zeugnissen und
        Diplomen bei uns. Willst du mehr Erfahren? Dann ruf uns an! Wir freuen
        uns von dir zu hören.
      </p>
      <Layout>
        <Button href="mailto:info@apptiva.ch">Bewirb dich</Button>
      </Layout>
    </Container>
  </main>
)
