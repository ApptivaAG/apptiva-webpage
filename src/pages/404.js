import React from 'react'
import styled from 'styled-components'
import { Container as ContainerDefault } from '../layouts/style'
import Layout from '../components/Layout'

const Container = styled(ContainerDefault)`
  padding-top: 4em;
  padding-bottom: 12em;
`

const NotFoundPage = () => (
  <Layout>
    <main>
      <Container>
        <h1>Da ist leider nichts...</h1>
        <p>
          Sie sind auf einer Seite gelandet die es nicht (mehr) gibt... Tut uns
          leid.
        </p>
        <a href="/">Zur Startseite</a>
      </Container>
    </main>
  </Layout>
)

export default NotFoundPage
