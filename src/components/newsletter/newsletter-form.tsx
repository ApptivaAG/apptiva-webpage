'use client'

import { cn } from '@/utils/cn'
import { useActionState, useState } from 'react'
import { subscribeToNewsletter } from '../server-actions/subscribe-to-newsletter'
import { Submit } from '../submit'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export default function NewsletterForm() {
  const [engaged, setEngaged] = useState(false)
  const [state, formAction] = useActionState(subscribeToNewsletter, {
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
          <Label htmlFor="newsletter-email">Deine Email-Adresse</Label>
          <Input
            onFocus={() => setEngaged(true)}
            intent="outline"
            type="email"
            name="email"
            id="newsletter-email"
            placeholder="deine@email.ch"
          />
        </div>
        <div className={cn(!engaged && 'max-md:hidden')}>
          <Label htmlFor="newsletter-name">
            Dein Vorname <small>optional</small>
          </Label>
          <Input
            intent="outline"
            type="text"
            name="name"
            id="newsletter-name"
            placeholder="Vorname"
          />
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
