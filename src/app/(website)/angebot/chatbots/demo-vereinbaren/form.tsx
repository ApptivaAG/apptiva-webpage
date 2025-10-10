'use client'

import { sendMail } from '@/components/server-actions/send-mail'
import { Submit } from '@/components/submit'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from 'react-dom'

export default function Form() {
  const [state, formAction] = useFormState(sendMail, { state: 'idle' })

  if (state.state === 'success') {
    return (
      <div className="pt-4">
        <div className="pb-2 text-5xl">👍</div>
        <p>
          Vielen Dank{state.name && ` ${state.name}`}! Deine Anfrage wurde
          erfolgreich versendet. 😁
        </p>
        <p>Wir werden uns so schnell wie möglich bei dir melden.</p>
      </div>
    )
  }
  return (
    <form action={formAction}>
      <p hidden>
        <label htmlFor="address">
          Nicht ausfüllen: <input type="text" name="address" />
        </label>
        <input
          type="text"
          name="subject"
          value="Bubble Chat Demo vereinbaren"
        />
        <input type="text" name="circle" value="bubble" readOnly />
      </p>
      <div>
        <Label>Name</Label>
        <Input type="text" name="name" required />
      </div>
      <div>
        <Label>Email-Adresse</Label>
        <Input type="email" name="email" required />
      </div>
      <div>
        <Label>Unternehmen</Label>
        <Input type="text" name="company" required />
      </div>
      <div>
        <Label>
          Telefonnummer <small>optional</small>
        </Label>
        <Input type="text" name="phone" />
      </div>

      <div>
        <Label htmlFor="referrer">
          Wie hast du uns gefunden? <small>optional</small>
        </Label>
        <Input type="text" name="referrer" id="referrer" />
      </div>

      <div>
        <Label>
          Nachricht <small>optional</small>
        </Label>
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
            Ups, es scheint als ob du ein Roboter bist. Bitte versuche es
            erneut.
          </em>
        </div>
      )}
      <Submit className="mt-4">Demo anfordern</Submit>
    </form>
  )
}
