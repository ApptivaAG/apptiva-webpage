'use server'

import { ContactFromMailSenderCopy } from '@/components/contact-form/contact-from-mail-sender'
import { Resend } from 'resend'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import ContactFromMailApptivaCopy from '../contact-form/contact-from-apptiva'

const resend = new Resend(process.env.RESEND_API_KEY)

type FormState =
  | {
      state: 'idle'
    }
  | {
      state: 'success'
      email: string
      name?: string
    }
  | {
      state: 'error'
      error: string
    }
  | {
      state: 'spam'
    }

const bubble = z.object({
  name: zfd.text(),
  email: zfd.text(),
  message: zfd.text(z.string().optional()),
  company: zfd.text(),
  subject: zfd.text(z.string().default('Kontaktformular apptiva.ch')),
  phone: zfd.text(z.string().optional()),
  circle: zfd.text(z.enum(['bubble'])),
  address: zfd.text(z.string().optional()),
})

const apptiva = z.object({
  name: zfd.text(),
  email: zfd.text(),
  message: zfd.text(),
  company: zfd.text(z.string().optional()),
  subject: zfd.text(z.string().default('Kontaktformular apptiva.ch')),
  circle: zfd.text(z.enum(['apptiva'])),
  address: zfd.text(z.string().optional()),
})

const schema = zfd.formData(z.union([bubble, apptiva]))

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

  try {
    const { name, email, message, subject, company, circle } = parsedData

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
        react: ContactFromMailApptivaCopy(parsedData),
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
    return { state: 'success', email, name }
  } catch (error) {
    console.error('Error sending mail', error)

    return {
      state: 'error',
      error: 'Leider ist ein Fehler aufgetreten. Versuche es später wieder.',
    }
  }
}

function mapCircleToEmail(circle: FormInputSchema['circle']) {
  switch (circle) {
    case 'bubble': {
      return 'bubble-chat@apptiva.ch'
    }
    case 'apptiva': {
      return 'info@apptiva.ch'
    }
    default: {
      return 'info@apptiva.ch'
    }
  }
}
