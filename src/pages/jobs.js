import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Title, Container, Subtitle, Button } from '../layouts/style'
import SEO from '../components/SEO'
import config from '../config'

const metadata = {
  title: 'Jobs',
  description: 'Wir bieten Jobs für Erwachsene',
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
      <small>80% - 100%, ab sofort</small>

      <p>Wir sind ein junges Software-Unternehmen und suchen Verstärkung.</p>
      <p>
        Du findest bei uns spannende und abwechslungsreiche Arbeit vor. Wir
        möchten mit dir gemeinsam Herausforderungen meistern und Spass an der
        Arbeit haben. Es würde uns freuen, dich schon bald kennen zu lernen!
      </p>

      <h3>Deine Stärken</h3>

      <ul>
        <li>Du bist teamfähig und selbständig.</li>
        <li>Du bist entscheidungsfreudig.</li>
        <li>Du verfügst über eine schnelle Auffassungsgabe.</li>
        <li>
          Du hast Freude, in unterschiedlichen Tätigkeitsgebieten zu wirken.
        </li>
        <li>Du bist gierig darauf, dich weiterzuentwickeln.</li>
        <li>Du steckst voller Ideen und Tatendrang.</li>
      </ul>

      <h3>Deine fachlichen Fähigkeiten</h3>

      <ul>
        <li>Dein Programmier-Beitrag führt schnell zum gewünschten Outcome.</li>
        <li>Dir ist Software Craftsmanship wichtig.</li>
        <li>Du magst mit HTML, CSS, JS ansprechende Oberflächen entwickeln.</li>
        <li>Du möchtest mit Node.js, React und Java entwickeln.</li>
        <li>Du weisst, wie man mit Git in einem Team arbeitet.</li>
      </ul>

      <h3>Deine Vorteile</h3>

      <ul>
        <li>Du wirst nicht mehr wie ein Kind behandelt.</li>
        <li>
          Du entscheidest über deine Tätigkeiten, deine Arbeitszeiten, deine
          Ferienzeit und deinen Lohn.
        </li>
        <li>
          Du arbeitest an spannenden Projekten wie Chatbots oder einem
          Partyplaner.
        </li>
        <li>Du verwendest moderne Tools und Libraries.</li>
        <li>Du hast die Chance, dich bei uns zu entfalten.</li>
        <li>
          Du erlebst ein selbstorganisierendes Unternehmen am eigenen Leibe.
        </li>
      </ul>

      <p>
        Blut geleckt? Dann überzeug uns mit deiner Bewerbung! Willst du mehr
        erfahren? Dann ruf uns an! Wir freuen uns, von dir zu hören.
      </p>
      <Layout>
        <Button href="mailto:info@apptiva.ch">Bewirb dich</Button>
      </Layout>
    </Container>
  </main>
)
