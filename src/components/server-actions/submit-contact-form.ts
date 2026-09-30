'use server'

import { headers } from 'next/headers'
import { after } from 'next/server'
import { sendContactMails, sendSpamCopy } from '@/domain/contact-form/mailer'
import { contactFormSchema, type FormState } from '@/domain/contact-form/schema'
import { trackKontaktanfrage } from '@/domain/contact-form/tracking'
import { checkSpam } from '@/domain/spam-check'

export async function submitContactForm(
  currentState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log('sending mail')

  const { data: parsedData, error } = contactFormSchema.safeParse(formData)

  if (error) {
    return {
      state: 'error',
      error: 'Ups, ein zwingendes Feld ist noch nicht ausgefüllt.',
    }
  }

  if (parsedData.address !== undefined) {
    console.warn('Spam detected')
    return { state: 'spam' }
  }

  const successState = {
    state: 'success' as const,
    email: parsedData.email,
    name: 'name' in parsedData ? parsedData.name : undefined,
    company: 'company' in parsedData ? parsedData.company : undefined,
    message: 'message' in parsedData ? parsedData.message : undefined,
    phone: 'phone' in parsedData ? parsedData.phone : undefined,
    referrer: 'referrer' in parsedData ? parsedData.referrer : undefined,
  }

  const spamCheck = await checkSpam(successState)

  if (spamCheck.spam) {
    // Silent drop: the bot sees a success, we only get a copy in the spam inbox.
    // No sender copy, so we don't mail addresses entered by bots.
    console.warn('Spam detected by Jev', JSON.stringify(spamCheck.scores))
    await sendSpamCopy(parsedData, spamCheck)
    return successState
  }

  try {
    const { error } = await sendContactMails(parsedData, spamCheck)

    if (error) {
      console.error('Error sending mail', error)

      return {
        state: 'error',
        error: 'Leider ist ein Fehler aufgetreten. Versuche es später wieder.',
      }
    }

    console.log('Mail sent', JSON.stringify(parsedData, null, 2))

    try {
      const requestHeaders = await headers()
      const userAgent = requestHeaders.get('user-agent') ?? ''
      const forwardedFor = requestHeaders.get('x-forwarded-for') ?? ''
      const kind = String(formData.get('kind') ?? 'unbekannt')
      const page = parsedData.page || 'unbekannt'
      after(() => trackKontaktanfrage({ kind, page, userAgent, forwardedFor }))
    } catch (error) {
      console.error('Error scheduling Plausible event', error)
    }

    return successState
  } catch (error) {
    console.error('Error sending mail', error)

    return {
      state: 'error',
      error: 'Leider ist ein Fehler aufgetreten. Versuche es später wieder.',
    }
  }
}
