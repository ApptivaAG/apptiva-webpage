'use server'

import { ContactEmailTemplate } from '@/components/contact-form/contact-email-template'
import { Resend } from 'resend'

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
    const { name, email, message, subject } = rawFormData
    console.log('sending mail via resend', name, email, message)

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      //   from: 'apptiva.ch <info@apptiva.ch>',
      //   to: `${email}`,
      subject: subject,
      text: message,
      // react: ContactEmailTemplate({
      //   firstName: `${name}`,
      // }) as React.ReactElement,
    })

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
