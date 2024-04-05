'use server'

import { ContactFromMailSenderCopy } from '@/components/contact-form/contact-from-mail-sender'
import { Resend } from 'resend'
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

export async function sendMail(
  currentState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log('sending mail')

  const rawFormData = {
    address: formData.get('address') as string,
    name: (formData.get('name') as string) || null,
    email: (formData.get('email') as string) || null,
    company: (formData.get('company') as string) || null,
    message: (formData.get('message') as string) || null,
    subject:
      (formData.get('subject') as string) ?? 'Kontaktformular apptiva.ch',
  }

  if (rawFormData.address !== (undefined || '')) {
    console.warn('Spam detected')
    return { state: 'spam' }
  }

  if (
    rawFormData.email === '' ||
    rawFormData.email === null ||
    rawFormData.name === '' ||
    rawFormData.name === null ||
    rawFormData.message === '' ||
    rawFormData.message === null
  ) {
    return {
      state: 'error',
      error: 'Ups, ein zwingendes Feld ist noch nicht ausgefüllt.',
    }
  }

  try {
    const { name, email, message, subject, company } = rawFormData
    console.log('sending mail via resend', name, email, message, subject)
    console.log('sending copy to apptiva.ch', {
      from: 'Kontaktformular apptiva.ch <kontaktformular@apptiva-mailer.ch>',
      to: `info@apptiva.ch`,
      subject: subject,
      name,
      message,
      email,
      company,
    })

    const { data, error } = await resend.batch.send([
      {
        from: 'Kontaktformular apptiva.ch <kontaktformular@apptiva-mailer.ch>',
        to: `${email}`,
        subject: subject,
        react: ContactFromMailSenderCopy({ name, message }),
      },
      {
        from: 'Kontaktformular apptiva.ch <kontaktformular@apptiva-mailer.ch>',
        to: `info@apptiva.ch`,
        subject: subject,
        react: ContactFromMailApptivaCopy({
          name,
          message,
          email,
          company,
        }),
      },
    ])

    if (error) {
      console.error('Error sending mail', error)

      return {
        state: 'error',
        error: 'Leider ist ein Fehler aufgetreten. Versuche es später wieder.',
      }
    }

    return { state: 'success', email, name }
  } catch (error) {
    console.error('Error sending mail', error)

    return {
      state: 'error',
      error: 'Leider ist ein Fehler aufgetreten. Versuche es später wieder.',
    }
  }
}
