import React, { useState } from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { useForm } from 'react-hook-form'
import { Button, Right } from '../style'
import { Input } from './ContactForm'

const NewsletterForm = () => {
  const { register, handleSubmit, errors, reset } = useForm()
  const [response, setResponse] = useState()

  const onSubmit = (data) => {
    addToMailchimp(data.email)
      .then(({ result, msg }) => {
        reset()
        if (result !== 'error') {
          setResponse(`Vielen Dank für das Abonnieren des Apptiva Newsletters.`)
        } else {
          setResponse(
            `Leider konnten wir diese Email nicht hinzufügen. <br/>${msg}`
          )
        }
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.log('Error', error)
        /* eslint-disable-next-line no-alert */
        alert(
          `Leider hat dies nicht funktioniert. Versuchen Sie es später nochmals.`
        )
      })
  }

  return (
    <>
      <form name="newsletter" onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            name="email"
            id="email"
            ref={register({ required: true })}
          />
          {errors.email && (
            <p css="color: red;">
              Bitte geben Sie Ihre Email an, damit wir wissen, wo wir den
              Newsletter hinschicken sollen.
            </p>
          )}
        </div>
        <Right>
          <Button type="submit">Newsletter abonnieren</Button>
        </Right>
      </form>
      {/* eslint-disable-next-line react/no-danger */}
      {response && <p dangerouslySetInnerHTML={{ __html: response }} />}
    </>
  )
}
export default NewsletterForm
