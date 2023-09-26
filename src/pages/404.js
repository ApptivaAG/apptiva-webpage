import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Container as ContainerDefault } from '../style'
import Layout from '../components/Layout'

const Container = styled(ContainerDefault)`
  padding-top: 4em;
  padding-bottom: 12em;
`

const NotFoundPage = () => (
  <Layout>
    <Container>
      <h1>Da ist leider nichts...</h1>
      <p>
        Sie sind auf einer Seite gelandet die es nicht (mehr) gibt... Tut uns
        leid.
      </p>
      <p>Vielleicht hilft einer der folgenden Links weiter.</p>
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
          <Link to="/unterstuetzung/">Unterstützung in Softwareprojekten</Link>
        </li>
      </ul>
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
          <Link to="/payflink/">Payflink - Restaurant Bestell App</Link>
        </li>
        <li>
          <Link to="/bubble-chat/">
            Bubble Chat - KI-basierte Chatbot Lösung
          </Link>
        </li>
      </ul>
      <br />
      <a href="/">Zur Startseite</a>
    </Container>
  </Layout>
)

export default NotFoundPage
