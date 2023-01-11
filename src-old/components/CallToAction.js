import React from 'react'
import { Section, Container, Button } from '../style'

const CallToAction = ({ dark = false }) => (
  <Section dark={dark}>
    <Container>
      <h2>Beschleunigen Sie jetzt Ihre Geschäftsprozesse</h2>
      <p>Rufen Sie uns an oder schreiben Sie uns eine Nachricht.</p>
      <Button to="/kontakt/">Jetzt Kontakt aufnehmen</Button>
    </Container>
  </Section>
)

export default CallToAction
