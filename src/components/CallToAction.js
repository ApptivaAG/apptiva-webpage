import React from 'react'
import Balancer from 'react-wrap-balancer'
import { Button, Container, Section } from '../style'

const CallToAction = ({ dark = false }) => (
  <Section dark={dark}>
    <Container>
      <h2>
        <Balancer>
          Beschleunigen Sie jetzt Ihre Geschäftsprozesse mit
          Software-Entwicklung in der Schweiz
        </Balancer>
      </h2>
      <p>Rufen Sie uns an oder schreiben Sie uns eine Nachricht.</p>
      <Button to="/kontakt/">Jetzt Kontakt aufnehmen</Button>
    </Container>
  </Section>
)

export default CallToAction
