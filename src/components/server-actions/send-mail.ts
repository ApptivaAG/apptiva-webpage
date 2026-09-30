'use server'

import { headers } from 'next/headers'
import { after } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { ContactFromMailSenderCopy } from '@/components/contact-form/sender-email/contact-from'
import { checkSpam } from '@/domain/spam-check'
import ContactFromMailApptivaCopy from '../contact-form/apptiva-email/contact-from'

const resend = new Resend(process.env.RESEND_API_KEY)

const SPAM_EMAIL = 'spam@apptiva.ch'

type FormState =
  | {
      state: 'idle'
    }
  | {
      state: 'success'
      email: string
      name?: string
      company?: string
      message?: string
      phone?: string
      referrer?: string
    }
  | {
      state: 'error'
      error: string
    }
  | {
      state: 'spam'
    }

const klar = z.object({
  kind: zfd.text(z.literal('klar')),
  name: zfd.text(),
  email: zfd.text(),
  message: zfd.text(z.string().optional()),
  company: zfd.text(),
  referrer: zfd.text(z.string().optional()),
  subject: zfd.text(z.string().default('Kontaktformular apptiva.ch')),
  phone: zfd.text(z.string().optional()),
  circle: zfd.text(z.enum(['klar'])),
  address: zfd.text(z.string().optional()),
  page: zfd.text(z.string().optional()),
})

const testChatbot = z.object({
  kind: zfd.text(z.literal('testChatbot')),
  email: zfd.text(),
  subject: zfd.text(z.string().default('Kontaktformular apptiva.ch')),
  circle: zfd.text(z.enum(['klar'])),
  address: zfd.text(z.string().optional()),
  page: zfd.text(z.string().optional()),
})

const apptiva = z.object({
  kind: zfd.text(z.literal('apptiva')),
  name: zfd.text(),
  email: zfd.text(),
  message: zfd.text(),
  company: zfd.text(z.string().optional()),
  referrer: zfd.text(z.string().optional()),
  subject: zfd.text(z.string().default('Kontaktformular apptiva.ch')),
  circle: zfd.text(z.enum(['apptiva'])),
  address: zfd.text(z.string().optional()),
  page: zfd.text(z.string().optional()),
})

const schema = zfd.formData(z.union([klar, apptiva, testChatbot]))

export type FormInputSchema = z.infer<typeof schema>

export async function sendMail(
  currentState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log('sending mail')

  const { data: parsedData, error } = schema.safeParse(formData)

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
    try {
      const { error } = await resend.emails.send({
        from: 'Kontaktformular apptiva.ch <kontaktformular@apptiva-mailer.ch>',
        to: SPAM_EMAIL,
        subject: `[SPAM?] ${parsedData.subject}`,
        react: ContactFromMailApptivaCopy(parsedData, spamCheck),
      })
      if (error) console.error('Error sending spam mail', error)
    } catch (error) {
      console.error('Error sending spam mail', error)
    }
    return successState
  }

  try {
    const { email, subject, circle } = parsedData

    const { error } = await resend.batch.send([
      {
        from: 'Kontaktformular apptiva.ch <kontaktformular@apptiva-mailer.ch>',
        to: `${email}`,
        subject: subject,
        react: ContactFromMailSenderCopy(parsedData),
      },
      {
        from: 'Kontaktformular apptiva.ch <kontaktformular@apptiva-mailer.ch>',
        to: mapCircleToEmail(circle),
        subject: subject,
        react: ContactFromMailApptivaCopy(parsedData, spamCheck),
      },
    ])

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

async function trackKontaktanfrage({
  kind,
  page,
  userAgent,
  forwardedFor,
}: {
  kind: string
  page: string
  userAgent: string
  forwardedFor: string
}) {
  console.log('trackKontaktanfrage', kind, page, userAgent, forwardedFor)
  try {
    const path = page.startsWith('/') ? page : '/'
    const response = await fetch('https://plausible.io/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'X-Forwarded-For': forwardedFor,
      },
      body: JSON.stringify({
        domain: 'apptiva.ch',
        name: 'Kontaktanfrage',
        url: `https://apptiva.ch${path}`,
        props: { kind, page },
      }),
    })
    if (!response.ok) {
      console.error('Plausible event failed', response.status)
    }
  } catch (error) {
    console.error('Error sending Plausible event', error)
  }
}

function mapCircleToEmail(circle: FormInputSchema['circle']) {
  switch (circle) {
    case 'klar': {
      return 'klar@apptiva.ch'
    }
    case 'apptiva': {
      return 'info@apptiva.ch'
    }
    default: {
      return 'info@apptiva.ch'
    }
  }
}
