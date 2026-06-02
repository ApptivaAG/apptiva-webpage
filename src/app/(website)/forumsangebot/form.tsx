'use client'

import { FormSuccessMessage } from '@/components/form-success-message'
import { sendMail } from '@/components/server-actions/send-mail'
import { Submit } from '@/components/submit'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useFormState } from 'react-dom'

export default function Form() {
  const [state, formAction] = useFormState(sendMail, { state: 'idle' })
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
        <input type="text" name="subject" value="What's next Forumsangebot" />
        <input type="text" name="circle" value="bubble" readOnly />
        <input type="text" name="kind" value="bubble" readOnly />
      </p>
      <div>
        <Label>Name</Label>
        <Input
          type="text"
          name="name"
          defaultValue={state.state === 'success' ? state.name : ''}
        />
      </div>
      <div>
        <Label>Email-Adresse</Label>
        <Input
          type="email"
          name="email"
          defaultValue={state.state === 'success' ? state.email : ''}
        />
      </div>
      <div>
        <Label>Unternehmen</Label>
        <Input
          type="text"
          name="company"
          defaultValue={state.state === 'success' ? state.company : ''}
        />
      </div>
      <div>
        <Label>
          Telefonnummer <small>optional</small>
        </Label>
        <Input
          type="text"
          name="phone"
          defaultValue={state.state === 'success' ? state.phone : ''}
        />
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
          defaultValue={state.state === 'success' ? state.message : ''}
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
      <Submit className="mt-4">Kostenlos anmelden</Submit>
    </form>
  )
}
