'use client'

import { cn } from '@/utils/cn'
import { useFormState, useFormStatus } from 'react-dom'
import Button from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { subscribe } from './subscribe'

export default function NewsletterForm() {
  const [state, formAction] = useFormState(subscribe, { state: 'idle' })
  if (state.state === 'success') {
    return (
      <div className="pt-4">
        <div className="pb-2 text-5xl">👍</div>
        <p>
          Vielen Dank{state.name && ` ${state.name}`}! Du hast den Newsletter
          erfolgreich abonniert. 😁
        </p>
        <p>
          Ab sofort erhältst du coole News auf <b>{state.email}</b>.
        </p>
      </div>
    )
  }
  return (
    <>
      <form
        className="flex flex-col gap-2 pt-6 md:flex-row md:items-end"
        action={formAction}
      >
        <div>
          <Label>Dein Vorname</Label>
          <Input intent="outline" type="text" name="name" />
        </div>
        <div>
          <Label>Deine Email-Adresse*</Label>
          <Input intent="outline" type="email" name="email" />
        </div>
        <Submit />
      </form>
      {state.state === 'error' && (
        <div className="pt-2">
          <em className="text-secondary">{state.error}</em>
        </div>
      )}
    </>
  )
}

function Submit() {
  const { pending } = useFormStatus()
  return (
    <Button
      className={cn('max-md:mt-4', pending && 'pointer-events-none opacity-40')}
      intent="secondary"
    >
      Abonnieren{pending && '...'}
    </Button>
  )
}
