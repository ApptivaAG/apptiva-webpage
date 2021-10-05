import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { MainTitle, Container, Button, Section } from '../style'
import SEO from '../components/SEO'
import config from '../config'
import Layout from '../components/Layout'

const metadata = {
  title: 'Jobs',
  description: `Fullstack Software-Entwickler:in und Unternehmer:in. 
    Du findest bei uns spannende und abwechslungsreiche Arbeit vor. 
    Wir möchten mit dir gemeinsam Herausforderungen meistern und Spass an der Arbeit haben. 
    Es würde uns freuen, dich schon bald kennen zu lernen!`,
  slug: 'jobs',
}

const Center = styled.div`
  text-align: center;
  padding-top: 1em;
`

const Jobs = () => (
  <Layout>
    <main>
      <Helmet title={`Jobs - ${config.company}`} />
      <SEO metaData={metadata} />
      <Section>
        <Container>
          <MainTitle>Jobs</MainTitle>
          <h2
            style={{
              marginBottom: 0,
            }}
          >
            Fullstack Software-Entwickler:in und Unternehmer:in*
          </h2>
          <small>80% - 100%, ab sofort</small>

          <p>
            Wir sind ein junges Software-Unternehmen und suchen Verstärkung.
          </p>
          <p>
            Du findest bei uns spannende und abwechslungsreiche Arbeit vor. Wir
            möchten mit dir gemeinsam Herausforderungen meistern und Spass an
            der Arbeit haben. Es würde uns freuen, dich schon bald kennen zu
            lernen!
          </p>
          <p>
            <small>
              * Was hat es mit &quot;Unternehmer:in&quot; auf sich? <br /> Bei
              uns haben alle die Möglichkeit — im kleinen und grossen Still —
              auf das Unternehmen Einfluss zu nehmen. Egal ob Projektumsetzung,
              Produktidee, Vorgehen, neue Mitarbeiter:innen oder Organisation,
              bei uns setzt du deine Visionen um! Entsprechend sind wir an
              Personen interessiert, die diese Chance nutzen und auf das
              Unternehmen Einfluss nehmen.
            </small>
          </p>

          <h3>Deine Stärken</h3>

          <ul>
            <li>Du bist teamfähig und selbständig.</li>
            <li>Du bist entscheidungsfreudig.</li>
            <li>Du verfügst über eine schnelle Auffassungsgabe.</li>
            <li>
              Du hast Freude, in unterschiedlichen Tätigkeitsgebieten zu wirken.
            </li>
            <li>
              Du willst dich als Mensch und Entwickler:in weiterentwickeln.
            </li>
            <li>Dein Team mag es mit dir zusammenzuarbeiten.</li>
          </ul>

          <h3>Deine fachlichen Fähigkeiten</h3>

          <ul>
            <li>
              Dein Programmier-Beitrag führt schnell zum gewünschten Outcome.
            </li>
            <li>Dir ist Software Craftsmanship wichtig.</li>
            <li>
              Du magst mit HTML, CSS, JS ansprechende Oberflächen entwickeln.
            </li>
            <li>Du möchtest mit Node.js, React und Java entwickeln.</li>
            <li>Du weisst, wie man mit Git in einem Team arbeitet.</li>
          </ul>

          <h3>Deine Vorteile</h3>

          <ul>
            <li>
              Du entscheidest über deine Tätigkeiten, deine Arbeitszeiten, deine
              Ferienzeit und deinen Lohn.
            </li>
            <li>
              Du arbeitest an spannenden Projekten wie Chatbots oder einer
              digitalen Speisekarte.
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
          <Center>
            <Button href="mailto:info@apptiva.ch">Bewirb dich</Button>
          </Center>
        </Container>
      </Section>
    </main>
  </Layout>
)

export default Jobs
