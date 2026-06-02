'use client'

import { sendMail } from '@/components/server-actions/send-mail'
import { Submit } from '@/components/submit'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from 'react-dom'

export default function TestChatbotForm() {
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
          value="Bubble Chat 30 Tage kostenlos testen"
          readOnly
        />
        <input type="text" name="circle" value="bubble" readOnly />
        <input type="text" name="kind" value="testChatbot" readOnly />
      </p>
      <div>
        <Label>Email-Adresse</Label>
        <Input type="email" name="email" />
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
