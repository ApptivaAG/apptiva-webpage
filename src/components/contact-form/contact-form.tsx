'use client'

import { useFormState } from 'react-dom'
import Heading from '../heading'
import Section from '../section'
import { sendMail } from '../server-actions/send-mail'
import { Submit } from '../submit'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const ContactForm = () => {
  const [state, formAction] = useFormState(sendMail, { state: 'idle' })

  return (
    <Section intent={'light'} level={'one'}>
      <div className="content">
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
                  <Label>
                    Unternehmen <small>optional</small>
                  </Label>
                  <Input intent="default" type="text" name="company" />
                </div>

                <div>
                  <Label>Nachricht</Label>
                  <textarea
                    title="Nachricht"
                    className="ring-offset-white file:font-medium bg-white flex h-full w-full rounded border border-primary px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    name="message"
                    rows={5}
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
