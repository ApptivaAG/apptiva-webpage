const JEV_URL = 'https://jevtypesafeai.com/api/v1/decide'
const TIMEOUT_MS = 3000
export const SPAM_THRESHOLD = 0.8

export type SpamFields = {
  name?: string
  email?: string
  company?: string
  phone?: string
  message?: string
  referrer?: string
}

const labels: Record<keyof SpamFields, string> = {
  name: 'Name',
  email: 'E-Mail Adresse',
  company: 'Unternehmen',
  phone: 'Telefon',
  message: 'Nachricht',
  referrer: 'Referenz (Wie hast du uns gefunden)',
}

type JevResponse = {
  answers?: Record<string, { type: 'noul'; noul: number }>
}

export type SpamResult = { spam: boolean; scores?: Record<string, number> }

/**
 * Asks Jev whether a contact form submission is spam.
 * Fails open: any error, timeout or missing API key returns `spam: false`.
 */
export async function checkSpam(fields: SpamFields): Promise<SpamResult> {
  const apiKey = process.env.JEV_API_KEY
  if (!apiKey) {
    console.warn('JEV_API_KEY not set, skipping spam check')
    return { spam: false }
  }

  const state = [
    'Submission of a contact form on the website of a Swiss software company (apptiva.ch).',
    ...(Object.keys(labels) as (keyof SpamFields)[])
      .filter((key) => fields[key]?.trim())
      .map((key) => `${labels[key]}: ${fields[key]}`),
  ].join('\n')

  try {
    const response = await fetch(JEV_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state,
        questions: {
          gibberish: {
            type: 'noul',
            instructions:
              'Do the name, company, message or referrer fields contain random letter strings instead of real words or names?',
          },
          bot: {
            type: 'noul',
            instructions:
              'Was this form submission most likely made by a bot or spammer rather than a real person interested in the company?',
          },
        },
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })

    if (!response.ok) {
      console.error('Jev spam check failed', response.status)
      return { spam: false }
    }

    const { answers } = (await response.json()) as JevResponse
    const scores = {
      gibberish: answers?.gibberish?.noul ?? 0,
      bot: answers?.bot?.noul ?? 0,
    }

    return {
      spam: Math.max(scores.gibberish, scores.bot) >= SPAM_THRESHOLD,
      scores,
    }
  } catch (error) {
    console.error('Jev spam check failed', error)
    return { spam: false }
  }
}
