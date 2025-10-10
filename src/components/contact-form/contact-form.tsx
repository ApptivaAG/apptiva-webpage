'use client'

import Link from 'next/link'
import { useFormState } from 'react-dom'
import Heading from '../heading'
import Section from '../section'
import { sendMail } from '../server-actions/send-mail'
import { Submit } from '../submit'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import UnderlineForLink from '../ui/underline-for-link'

const ContactForm = () => {
  const [state, formAction] = useFormState(sendMail, { state: 'idle' })

  return (
    <Section intent={'light'} level={'one'}>
      <div className="content">
        <div className="col-left mt-4 max-w-2xl lg:mt-6">
          <Heading level={2} size={5}>
            Telefon
          </Heading>
          <p>
            <Link href="tel:+41413222626">
              <UnderlineForLink>041 322 26 26</UnderlineForLink>
            </Link>
          </p>
          <Heading level={2} size={5} className="pt-3">
            Mail
          </Heading>
          <p>
            <Link href="mailto:info@apptiva.ch">
              <UnderlineForLink>info@apptiva.ch</UnderlineForLink>
            </Link>
          </p>
          <Heading level={2} size={5} className="pt-3">
            Adresse
          </Heading>
          <p>
            Apptiva AG
            <br />
            Obergrundstrasse 73
            <br />
            6003 Luzern
          </p>
        </div>
        <div className="col-right max-lg:mt-4">
          <div className="flex flex-col gap-2 pt-6">
            <Heading level={2} size={5}>
              Kontaktformular
            </Heading>
            {state.state === 'success' ? (
              <div className="pt-4">
                <div className="pb-2 text-5xl">👍</div>
                <p>
                  Vielen Dank{state.name && ` ${state.name}`}! Deine Nachricht
                  wurde erfolgreich versendet. 😁
                </p>
                <p>Wir werden uns so schnell wie möglich bei dir melden.</p>
              </div>
            ) : (
              <form action={formAction}>
                <p hidden>
                  <label htmlFor="address">
                    Nicht ausfüllen: <input type="text" name="address" />
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value="Kontaktformular apptiva.ch"
                    readOnly={true}
                  />
                  <input type="text" name="circle" value="apptiva" readOnly />
                </p>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    intent="default"
                    type="text"
                    name="name"
                    id="name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email-Adresse</Label>
                  <Input
                    intent="default"
                    id="email"
                    type="email"
                    name="email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company">
                    Unternehmen <small>optional</small>
                  </Label>
                  <Input
                    intent="default"
                    type="text"
                    name="company"
                    id="company"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Nachricht</Label>
                  <textarea
                    id="message"
                    title="Nachricht"
                    className="ring-offset-white file:font-medium bg-white flex h-full w-full rounded border border-primary px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    name="message"
                    rows={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="referrer">
                    Wie hast du uns gefunden? <small>optional</small>
                  </Label>
                  <Input
                    intent="default"
                    type="text"
                    name="referrer"
                    id="referrer"
                  />
                </div>
                {state.state === 'error' && (
                  <div className="pt-2">
                    <em className="">{state.error}</em>
                  </div>
                )}
                {state.state === 'spam' && (
                  <div className="pt-2">
                    <em className="">
                      Ups, es scheint als ob du ein Roboter bist. Bitte versuche
                      es erneut.
                    </em>
                  </div>
                )}
                <Submit className="mt-4">Senden</Submit>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default ContactForm
