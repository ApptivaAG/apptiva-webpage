'use client'

import { useFormState } from 'react-dom'
import { Submit } from '../submit'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { subscribeToNewsletter } from '../server-actions/subscribe-to-newsletter'
import { useState } from 'react'
import { cn } from '@/utils/cn'

export default function NewsletterForm() {
  const [engaged, setEngaged] = useState(false)
  const [state, formAction] = useFormState(subscribeToNewsletter, {
    state: 'idle',
  })
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
        className="flex flex-col gap-2 md:flex-row md:items-end"
        action={formAction}
      >
        <div>
          <Label>Deine Email-Adresse</Label>
          <Input
            onFocus={() => setEngaged(true)}
            intent="outline"
            type="email"
            name="email"
          />
        </div>
        <div className={cn(!engaged && 'max-md:hidden')}>
          <Label>
            Dein Vorname <small>optional</small>
          </Label>
          <Input intent="outline" type="text" name="name" />
        </div>
        <Submit className={cn(!engaged && 'max-md:hidden')}>Abonnieren</Submit>
      </form>
      {state.state === 'error' && (
        <div className="pt-2">
          <em className="text-secondary">{state.error}</em>
        </div>
      )}
    </>
  )
}
