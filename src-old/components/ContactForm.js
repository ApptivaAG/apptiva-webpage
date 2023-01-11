import React, { useState } from 'react'
import { navigate } from 'gatsby-link'
import styled, { css } from 'styled-components'
import fetch from 'unfetch'

import { Button } from '../style'

const sharedInput = css`
  display: block;
  width: 100%;
  padding: 0.5em;
  margin: 0.5em 0 1em 0;
  outline: none;
  color: #777777;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: border-box;
`

export const Input = styled.input`
  ${sharedInput};
`
export const Textarea = styled.textarea`
  ${sharedInput};
`

export const encode = (data) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')

const analyticsFormSent = () =>
  typeof window !== 'undefined' &&
  window.gtag('event', 'submit', {
    // string - required - The object that was interacted with (e.g.video)
    event_category: 'Kontaktformular',
    // string - required - Type of interaction (e.g. 'play')
    event_action: 'Verschickt',
    // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
    event_label: 'Apptiva Zielvorhaben',
    // number - optional - Numeric value associated with the event. (e.g. A product ID)
    value: 1,
  })

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const { name, email, message, address } = form

  const handleSubmit = (e) => {
    e.preventDefault()

    if (address !== undefined) {
      return // spam
    }
    if (email === '' || name === '') {
      /* eslint-disable-next-line no-alert */
      alert('Ups, ein zwingendes Feld ist noch nicht ausgefüllt.')
      return
    }

    const body = encode({
      'form-name': 'contact',
      subject: 'Kontaktformular apptiva.ch',
      ...form,
    })

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
      .then(() => {
        navigate('/formular-gesendet/')
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.log('Error', error)
        /* eslint-disable-next-line no-alert */
        alert(
          `Leider hat dies nicht funktioniert. Entschuldigen Sie die Umstände. Wenn Sie uns auf info@apptiva.ch ein Email schicken melden wir uns sofort bei Ihnen.`
        )
      })

    analyticsFormSent()
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <form
      name="contact"
      data-netlify="true"
      data-netlify-honeypot="address"
      onSubmit={handleSubmit}
    >
      <p hidden>
        <label htmlFor="address">
          Nicht ausfüllen:{' '}
          <input type="text" name="address" onChange={handleChange} />
        </label>
        <input type="text" name="subject" />
      </p>
      <p>
        <label htmlFor="name">
          Ihr Name (Pflichtfeld){' '}
          <Input type="text" name="name" value={name} onChange={handleChange} />
        </label>
      </p>
      <p>
        <label htmlFor="email">
          Ihre E-Mail-Adresse (Pflichtfeld){' '}
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <label htmlFor="message">
          Ihre Nachricht{' '}
          <Textarea name="message" value={message} onChange={handleChange} />
        </label>
      </p>
      <p>
        <Button type="submit">Senden</Button>
      </p>
    </form>
  )
}

export default ContactForm
