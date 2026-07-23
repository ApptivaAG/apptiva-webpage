'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'
import { FormSuccessMessage } from '@/components/form-success-message'
import { sendMail } from '@/components/server-actions/send-mail'
import { Submit } from '@/components/submit'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function TestChatbotForm() {
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
        <input
          type="text"
          name="subject"
          value="Bubble Chat 30 Tage kostenlos testen"
          readOnly
        />
        <input type="text" name="circle" value="bubble" readOnly />
        <input type="text" name="kind" value="testChatbot" readOnly />
      </p>
      <div>
        <Label>E-Mail-Adresse</Label>
        <Input
          type="email"
          name="email"
          defaultValue={state.state === 'success' ? state.email : ''}
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
      <div className="text-right">
        <Submit intent="primary" className="mt-4">
          Jetzt Testzugang sichern!
        </Submit>
      </div>
    </form>
  )
}
