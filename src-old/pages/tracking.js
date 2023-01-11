import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import { useLocalStorage } from '../components/useLocalStorage'
import { Container, Section } from '../style'

const Tracking = () => {
  const [ignore, setIgnore] = useLocalStorage('plausible_ignore', false)

  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Section>
        <Container>
          <h1>Analytics Exclude</h1>
          <p>
            Click the button below to toggle your exclusion in analytics for
            this site
          </p>
          {ignore ? (
            <>
              <p>
                You currently <b>are excluding</b> your visits.
              </p>
              <button type="button" onClick={() => setIgnore(false)}>
                Stop excluding my visits
              </button>
            </>
          ) : (
            <>
              <p>
                You currently <b>are not excluding</b> your visits.
              </p>
              <button type="button" onClick={() => setIgnore(true)}>
                Exclude my visits
              </button>
            </>
          )}
        </Container>
      </Section>
    </Layout>
  )
}
export default Tracking
