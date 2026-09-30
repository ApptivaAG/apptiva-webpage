import { Resend } from 'resend'
import ContactFromMailApptivaCopy from '@/components/contact-form/apptiva-email/contact-from'
import { ContactFromMailSenderCopy } from '@/components/contact-form/sender-email/contact-from'
import type { SpamResult } from '@/domain/spam-check'
import type { FormInputSchema } from './schema'

const resend = new Resend(process.env.RESEND_API_KEY)

const SPAM_EMAIL = 'spam@apptiva.ch'
const FROM = 'Kontaktformular apptiva.ch <kontaktformular@apptiva-mailer.ch>'

export function mapCircleToEmail(circle: FormInputSchema['circle']) {
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

/** Sends the sender copy and the internal mail. Returns the Resend error, if any. */
export async function sendContactMails(
  data: FormInputSchema,
  spamCheck: SpamResult
) {
  const { error } = await resend.batch.send([
    {
      from: FROM,
      to: `${data.email}`,
      subject: data.subject,
      react: ContactFromMailSenderCopy(data),
    },
    {
      from: FROM,
      to: mapCircleToEmail(data.circle),
      subject: data.subject,
      react: ContactFromMailApptivaCopy(data, spamCheck),
    },
  ])
  return { error }
}

/** Sends a copy to the spam inbox only. Never throws. */
export async function sendSpamCopy(
  data: FormInputSchema,
  spamCheck: SpamResult
) {
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: SPAM_EMAIL,
      subject: `[SPAM?] ${data.subject}`,
      react: ContactFromMailApptivaCopy(data, spamCheck),
    })
    if (error) console.error('Error sending spam mail', error)
  } catch (error) {
    console.error('Error sending spam mail', error)
  }
}
