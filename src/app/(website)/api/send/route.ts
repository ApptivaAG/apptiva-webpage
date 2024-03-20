import { EmailTemplate } from '@/components/contact-form/email-template'
import { NextRequest } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, subject } = await req.json()
    console.log('sending mail via resend', name, email, message)

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      //   from: 'apptiva.ch <info@apptiva.ch>',
      //   to: `${email}`,
      subject: `${subject}`,
      react: EmailTemplate({ firstName: `${name}` }) as React.ReactElement,
    })

    if (error) {
      return Response.json({ error })
    }

    return Response.json({ data })
  } catch (error) {
    return Response.json({ error })
  }
}
