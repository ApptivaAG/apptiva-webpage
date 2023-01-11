import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'
import CallToAction from '../components/CallToAction'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { Button, Centered, Container, MainTitle, Section } from '../style'

import arrow from '../img/arrow.svg'
import arrowMobile from '../img/arrow-mobile.svg'

const orgTools = [
  { name: 'Reviews / Planung', size: 'small', description: 'Wöchentlich' },
  {
    name: 'Umsetzung',
    size: 'small',
    description: 'Wöchentlich',
  },
  {
    name: 'Veröffentlichung von neuen Funktionen',
    size: 'small',
    description: 'Wöchentlich',
  },
  {
    name: 'Bezahlung',
    size: 'small',
    description: 'Monatlich / mit jedem Release',
  },
]

const initialTools = [
  { name: 'Proof of concept / Technische Abklärung', size: 'medium' },
  { name: 'Ziele / Outcome', size: 'small', link: null },
  { name: 'Story Map', size: 'medium' },
  { name: 'Domäne kennenlernen', size: 'small' },
  { name: 'Anwender-Interviews', size: 'medium' },
  { name: 'Sketches / Wireframes', size: 'medium' },
  { name: 'Persona modellieren', size: 'large' },
  { name: 'Budget festlegen / Aufwandschätzung', size: 'large' },
  {
    name: 'Rahmenbedingungen definieren',
    size: 'large',
    description:
      'Datenschutz, Datensicherheit, Meilensteine, technische Vorgaben, ... ',
  },
  { name: 'Testkonzept erstellen', size: 'medium' },
]

const implementationTools = [
  { name: 'Priorisieren', size: 'medium' },
  {
    name: 'Anforderungen erfassen oder anpassen',
    size: 'medium',
  },
  { name: 'Anforderungen umsetzen', size: 'small' },
  { name: 'Tests durch den Kunden', size: 'medium' },
  { name: 'Lösungsinhalte erfassen', size: 'small' },
  {
    name: 'Testautomatisierung',
    size: 'medium',
    description: 'Hauptprozesse mit Integrationstests abdecken, Mail-Mock',
  },
  { name: 'Hallway-Tests', size: 'medium', link: null },
  { name: 'Anwender-Dokumentation', size: 'large' },
  { name: 'System für lauffähige Lösung', size: 'small' },
  { name: 'Service Level Vereinbarung (SLA)', size: 'medium' },
  { name: 'Usability-Tests', size: 'large' },
  { name: 'App-Store Inhalte erfassen', size: 'large' },
  { name: 'Datenschutzrichtlinien erfassen', size: 'large' },
  { name: 'Anwenderschulung', size: 'large' },
  { name: 'Support', size: 'small' },
  { name: 'Backups', size: 'small' },
  { name: 'Betrieb der Systeme', size: 'small' },
  { name: 'Penetration-Tests', size: 'large' },
]

const metadata = {
  title: 'Unser agiles Vorgehen für Software-Entwicklung',
  description: `Unser agiles Vorgehen für optimale Software-Entwicklung ist
  Teil des Erfolgsrezepts von Apptiva. Profitieren Sie davon!`,
  slug: 'vorgehen',
}

const Vorgehen = () => (
  <Layout>
    <main>
      <SEO metaData={metadata} />
      <article>
        <Section>
          <Container>
            <MainTitle>Vorgehen Software-Entwicklung</MainTitle>
            <Centered>
              <p>
                <b>
                  Unser agiles Vorgehen für optimale Software-Entwicklung ist
                  Teil des Erfolgsrezepts von Apptiva. Profitieren Sie davon!
                </b>
              </p>
            </Centered>
          </Container>
        </Section>
        <Section>
          <Container>
            <Centered>
              <h2>Ablauf</h2>
              <StaticImage
                src="../img/vorgehen.png"
                alt="Vorgehen"
                width={800}
                layout="constrained"
                className="lightbox"
              />
            </Centered>
            <p>
              Mit den folgenden organisatorischen Tätigkeiten möchten wir
              Transparenz und Steuerungsmöglichkeiten für alle Partien des
              Projekts gewährleisten.
            </p>
            <Grid>
              {orgTools.map((tool) => (
                <React.Fragment key={tool.name}>
                  <div />
                  <div
                    css={
                      tool.name === 'Bezahlung' &&
                      `@media (min-width: 768px) {grid-column: 5;}`
                    }
                  >
                    <Tool size={tool.size} description={tool.description}>
                      {tool.name}
                    </Tool>
                  </div>
                </React.Fragment>
              ))}
            </Grid>
          </Container>
        </Section>
        <Section>
          <Container>
            <Centered>
              <h2>Initialisierung</h2>
              <StaticImage
                src="../img/gemeinsames-verstaendnis.png"
                alt="Gemeinsames Verständnis"
                width={600}
                layout="constrained"
                className="lightbox"
              />
            </Centered>

            <p>
              Bei der Initialisierung geht es darum, ein grobes, gemeinsames
              Verständnis über das Projekt und die Lösung zu erhalten. Die
              folgenden Aufgaben gehen wir zwar zu Beginn des Projekts an,
              passen diese aber während dem ganzen Projekt stets den gewünschten
              Ergebnissen an.
            </p>
            <Grid>
              {initialTools.map((tool) => (
                <React.Fragment key={tool.name}>
                  <div />
                  <div>
                    <Tool size={tool.size} description={tool.description}>
                      {tool.name}
                    </Tool>
                  </div>
                </React.Fragment>
              ))}
            </Grid>
            <Description />
          </Container>
        </Section>
        <Section>
          <Container>
            <Centered>
              <h2>Umsetzung & Betrieb</h2>
              <StaticImage
                src="../img/iterativ.png"
                alt="Iteratives Vorgehen"
                width={600}
                layout="constrained"
                className="lightbox"
              />
            </Centered>

            <p>
              Wir streben stets einen frühen produktiven Einsatz der Lösung an,
              stellen dabei aber die kontinuierliche Weiterentwicklung sicher.
              Neue Features werden fortlaufend zur Verfügung gestellt.
            </p>
            <Grid>
              {implementationTools.map((tool) => (
                <React.Fragment key={tool.name}>
                  <div key={`${tool.name}1`} />
                  <div key={`${tool.name}2`}>
                    <Tool size={tool.size} description={tool.description}>
                      {tool.name}
                    </Tool>
                  </div>
                </React.Fragment>
              ))}
            </Grid>
            <Description />
          </Container>
        </Section>
        <Section>
          <Container>
            <iframe
              width="100%"
              height="500"
              src="https://www.youtube.com/embed/62l0zM_Xqxc"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </Container>
        </Section>
        <Section>
          <Container>
            <Centered>
              <h2>User Centered Design</h2>
            </Centered>
            <p>
              Viele der oben genannten Tätigkeiten stammen aus der
              Disziplin&nbsp;
              <i>User Centered Design</i>. Diese helfen bei der Entwicklung
              einer Lösung, welche passgenau das volle Potenzial ausschöpfen.
            </p>
            <Button to="/user-centered-design/">Mehr über UCD erfahren</Button>
          </Container>
        </Section>
      </article>
      <CallToAction dark />
    </main>
  </Layout>
)

const Tool = ({ children, size, description }) => (
  <ToolStyle size={size}>
    <div>
      {children} <br />
      <small>{description}</small>
    </div>
  </ToolStyle>
)

const Description = () => (
  <Legend>
    <ul>
      <Item color="#008fd7">Bei jedem Projekt</Item>
      <Item color="#ddd">Wenn möglich</Item>
      <Item color="white">Falls sinnvoll</Item>
    </ul>
  </Legend>
)

export default Vorgehen

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  padding-top: 2em;
  padding-bottom: 2em;
  padding-left: 2em;
  padding-right: 2em;

  @media (min-width: 768px) {
    grid-template-columns: repeat(7, 1fr);
    padding-bottom: 6em;
    background: linear-gradient(
      0deg,
      rgb(255, 255, 255) 0%,
      rgba(255, 255, 255, 0) 30%
    );
    overflow: hidden;
  }
`
const ToolStyle = styled.div`
  position: relative;
  margin-bottom: 1em;
  div {
    font-size: 0.8em;
    font-weight: 400;
    padding: 0.5em;
    margin: 0 -2em;
    min-height: 3em;
    border: 1px solid #eee;
    border-radius: 0.5em;
    color: ${(p) =>
      p.size === 'small' ? p.theme.color.bg : p.theme.color.text};
    background: ${(p) =>
      p.size === 'small'
        ? p.theme.color.primary
        : p.size === 'medium'
        ? '#ddd'
        : 'white'};

    small {
      opacity: 0.5;
    }
  }
  :before {
    z-index: -1;
    content: url(${arrowMobile});
    height: 40px;
    width: 45px;
    display: block;
    position: absolute;
    left: calc(50% - 22px / 2);
    top: 100%;
  }
  @media (min-width: 768px) {
    :before {
      content: url(${arrow});
      height: 200px;
    }
  }
`
const Legend = styled.div`
  font-size: 0.6em;
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
    padding: 0;
  }
`
const Item = styled.li`
  display: flex;
  :before {
    content: '';
    display: block;
    height: 1em;
    width: 1em;
    margin-right: 0.5em;
    border: 1px solid #aaa;
    background: ${(p) => p.color};
  }
`
