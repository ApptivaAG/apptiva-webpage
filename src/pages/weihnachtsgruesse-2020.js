import React from 'react'
import { navigate } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet'
import fetch from 'unfetch'

import Layout from '../components/Layout'
import {
  Button,
  Centered,
  Container,
  MainTitle,
  Right,
  Section,
} from '../style'
import { encode, Input, Textarea } from '../components/ContactForm'
import SEO from '../components/SEO'
import config from '../config'

const metadata = {
  title: 'Weihnachtsgrüsse 2020',
  description:
    'Herzlichen Dank an alle, die in irgendeiner Form mit uns zusammengearbeitet haben in diesem ganz speziellen Jahr 2020.',
  slug: 'weihnachtsgruesse-2020',
}

const Weihnachtsgruesse2020 = () => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data) => {
    const body = encode({
      'form-name': 'greetings_2020',
      subject: 'Weihnachtsgrüsse',
      ...data,
    })

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
      .then(() => {
        navigate('/gruss-erhalten/')
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.log('Error', error)
        /* eslint-disable-next-line no-alert */
        alert(
          `Leider hat dies nicht funktioniert. Versuche es später nochmals.`
        )
      })
  }

  return (
    <Layout>
      <Container>
        <Helmet title={`Weihnachtsgrüsse 2020 - ${config.company}`} />
        <SEO metaData={metadata} />

        <Section css="padding-bottom: 0;">
          <MainTitle>Weihnachts&shy;grüsse 2020</MainTitle>
        </Section>
        <Section css="font-size: 1.8em; padding: 0;">
          <StaticImage src="../img/weihnachtsgruesse-2020.png" />

          <p>
            <b>Herzlichen Dank</b> an alle, die in irgendeiner Form mit uns
            zusammengearbeitet haben in diesem ganz speziellen Jahr 2020.
          </p>
          <p>
            Hoffentlich ergibt sich auch im nächsten Jahr die Chance, mit euch
            die Welt ein kleines bisschen besser zu machen. Wir wünschen euch
            allen <b>von Herzen frohe Weihnachten und ein gutes, neues Jahr</b>.
          </p>
        </Section>
        <Centered css="font-size: 4em;">
          <span role="img" aria-label="Xmas trees">
            🎄🎄🎄
          </span>
        </Centered>
        <Section>
          <h2>Hinterlasse einen Gruss</h2>
          <p>
            Hinterlasse einen Gruss an das Apptiva Team. Wir freuen uns sehr
            über alle Rückmeldungen!
          </p>
          <form
            name="greetings_2020"
            data-netlify
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                name="name"
                id="name"
                ref={register({ required: true })}
              />
              {errors.name && (
                <p css="color: red;">
                  Bitte gib deinen Namen an, damit wir wissen, wer uns den Gruss
                  schickt.
                </p>
              )}
            </div>
            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="greeting">Gruss</label>
              <Textarea
                name="greeting"
                id="greeting"
                rows="10"
                ref={register({ required: true })}
              />
              {errors.greeting && (
                <p css="color: red;">Bitte gib deinen Gruss ein.</p>
              )}
            </div>
            <Right>
              <Button type="submit">Gruss senden</Button>
            </Right>
          </form>
        </Section>
      </Container>
    </Layout>
  )
}
export default Weihnachtsgruesse2020
