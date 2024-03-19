'use server'

import client from '@mailchimp/mailchimp_marketing'

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

export async function subscribe(
  currentState: FormState,
  formData: FormData
): Promise<FormState> {
  'use server'
  const email = formData.get('email') as string
  const name = formData.get('name') as string

  if (!email) {
    return {
      state: 'error',
      error: 'Bitte die Email-Adresse eintragen.',
    } as const
  }
  client.setConfig({
    apiKey: process.env.MAIL_CHIMP_API_KEY,
    server: 'us13',
  })

  const additionalFields = name
    ? {
        merge_fields: {
          FNAME: name,
        },
      }
    : {}

  try {
    const response = await client.lists.setListMember('9612e94e98', email, {
      email_address: email,
      status_if_new: 'subscribed',
      ...additionalFields,
    })
    if (response.status === 'subscribed') {
      return { state: 'success', email, name } as const
    }
  } catch (error) {
    console.error('Error subscribing to newsletter', { cause: error })
  }

  return {
    state: 'error',
    error: 'Leider ist ein Fehler aufgetreten. Versuche es später wieder.',
  } as const
}
