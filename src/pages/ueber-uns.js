import React from 'react'
import styled from 'styled-components'
import { Container, Section, Title } from '../style'
import { description } from '../config'

import Layout from '../components/Layout'
import Employees from '../components/Employees'

const AboutUs = () => (
  <Layout>
    <main>
      <Section>
        <Container>
          <h1>Über uns</h1>
          <p>{description}</p>
          <p>
            Wer sind wir, woher kommen wir, weshalb sind wir, wo sind wir
            (Büro-Foto)
          </p>
          <h2>Unser Team</h2>

          <p>
            Fotos mit mehr Tischen auch bei{' '}
            <a href="https://business.google.com/posts/l/04340041156497988688?hl=en">
              Google Business publizieren
            </a>
          </p>

          <a href="/">Zur Startseite</a>
        </Container>
      </Section>
      <Employees />
    </main>
  </Layout>
)

export default AboutUs
