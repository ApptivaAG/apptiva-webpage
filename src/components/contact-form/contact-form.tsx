'use client'

import { useState } from 'react'
import Heading from '../heading'
import Section from '../section'
import Button from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useFormStatus } from 'react-dom'

export const encode = (data: { [x: string]: string | number | boolean }) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')

const ContactForm = () => {
  const { pending } = useFormStatus()

  async function sendMessage(formData: any) {
    const rawFormData = {
      address: formData.get('address'),
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
    }

    console.log('*** rawFormData', rawFormData)

    if (rawFormData.address !== (undefined || '')) {
      return // spam
    }

    if (rawFormData.email === '' || rawFormData.name === '') {
      /* eslint-disable-next-line no-alert */
      alert('Ups, ein zwingendes Feld ist noch nicht ausgefüllt.')
      return
    }

    // const body = encode({
    //   'form-name': 'contact',
    //   subject: 'Kontaktformular apptiva.ch',
    //   ...rawFormData,
    // })

    // console.log('*** body', body)

    await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: rawFormData.name,
        email: rawFormData.email,
        message: rawFormData.message,
        subject: 'Kontaktformular apptiva.ch',
      }),
    })
      .then(() => {
        // Toast notification
        //toast.success('Your email message has been sent successfully')
        /* eslint-disable-next-line no-alert */
        alert(`Jupidupiduu.`)
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.log('Error', error)
        /* eslint-disable-next-line no-alert */
        alert(
          `Leider hat dies nicht funktioniert. Entschuldigen Sie die Umstände. Wenn Sie uns auf info@apptiva.ch ein Email schicken melden wir uns sofort bei Ihnen.`
        )
      })

    // todo: send mail here

    // fetch('/', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body,
    // })
    //   .then(() => {
    //     //navigate('/formular-gesendet/')
    //   })
    //   .catch((error) => {
    //     /* eslint-disable-next-line no-console */
    //     console.log('Error', error)
    //     /* eslint-disable-next-line no-alert */
    //     alert(
    //       `Leider hat dies nicht funktioniert. Entschuldigen Sie die Umstände. Wenn Sie uns auf info@apptiva.ch ein Email schicken melden wir uns sofort bei Ihnen.`
    //     )
    //   })

    /*
    formdata  FormData {
  [Symbol(state)]: [
    { name: 'address', value: '' },
    { name: 'subject', value: '' },
    { name: 'name', value: 'sdf' },
    { name: 'email', value: 'carla.iten@apptiva.ch' },
    { name: 'name', value: 'sdf' },
    { name: 'message', value: 'hoi hoi hoi' }
  ]
}
    */
  }

  return (
    <Section intent={'light'} level={'one'}>
      <div className="content">
        <div className="pb-4">
          <Heading level={2} size={3} className={'pb-5'}>
            Kontakt
          </Heading>
          <p>
            Möchtest du uns <u>kennenlernen</u> oder hast du Fragen zu unseren
            Dienstleistungen? <u>Zögere nicht</u> und nimm mit uns Kontakt auf!
          </p>
        </div>
        <div className="col-left mt-4 max-w-2xl lg:mt-6">
          <Heading level={5} size={5} className={''}>
            Telefon
          </Heading>
          <p>041 322 26 26</p>
          <Heading level={5} size={5} className={'pt-3'}>
            Mail
          </Heading>
          <p>info@apptiva.ch</p>
          <Heading level={5} size={5} className={'pt-3'}>
            Adresse
          </Heading>
          <p>
            Apptiva AG
            <br />
            Eichweid 1 <br />
            6203 Sempach Station
          </p>
        </div>
        <div className=" col-right max-lg:mt-4">
          <div className="flex flex-col gap-2 pt-6 ">
            <Heading level={5} size={5} className={''}>
              Kontaktformular
            </Heading>
            <form action={sendMessage}>
              <p hidden>
                <label htmlFor="address">
                  Nicht ausfüllen: <input type="text" name="address" />
                </label>
                <input type="text" name="subject" />
              </p>
              <div>
                <Label>Name</Label>
                <Input intent="default" type="text" name="name" />
              </div>
              <div>
                <Label>Email-Adresse</Label>
                <Input intent="default" type="email" name="email" />
              </div>
              <div>
                <Label>Unternehmen</Label>
                <Input intent="default" type="text" name="company" />
              </div>

              <div>
                <Label>Nachricht</Label>
                <textarea
                  className="ring-offset-white file:font-medium bg-white flex h-full w-full rounded border border-primary px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  name="message"
                  rows={5}
                />
              </div>
              <Button className="mt-4" intent="primary">
                Senden
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default ContactForm
