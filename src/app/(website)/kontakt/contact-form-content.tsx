'use client'

import { FormSuccessMessage } from '@/components/form-success-message'
import { sendMail } from '@/components/server-actions/send-mail'
import { Submit } from '@/components/submit'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useActionState } from 'react'

export const ContactFormContent = () => {
  const [state, formAction] = useActionState(sendMail, { state: 'idle' })
  const [correcting, setCorrecting] = useState(false)

  const handleAction = (formData: FormData) => {
    setCorrecting(false)
    formAction(formData)
  }

  if (state.state === 'success' && !correcting) {
    return (
      <FormSuccessMessage
        name={state.name}
        email={state.email}
        onCorrect={() => setCorrecting(true)}
      />
    )
  }

  return (
    <form action={handleAction}>
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
        <input type="text" name="kind" value="apptiva" readOnly />
      </p>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          intent="default"
          type="text"
          name="name"
          id="name"
          required
          defaultValue={state.state === 'success' ? state.name : ''}
        />
      </div>
      <div>
        <Label htmlFor="email">E-Mail-Adresse</Label>
        <Input
          intent="default"
          id="email"
          type="email"
          name="email"
          required
          defaultValue={state.state === 'success' ? state.email : ''}
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
          defaultValue={state.state === 'success' ? state.company : ''}
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
          defaultValue={state.state === 'success' ? state.message : ''}
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
          defaultValue={state.state === 'success' ? state.referrer : ''}
        />
      </div>
      {state.state === 'error' && (
        <div className="pt-2">
          <em className="text-destructive">{state.error}</em>
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
      <Submit className="mt-4">Senden</Submit>
    </form>
  )
}
