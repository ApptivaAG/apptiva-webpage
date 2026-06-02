import { FormInputSchema } from '@/components/server-actions/send-mail'
import StandardContactEmail from './standard-contact-email'
import TestChatbotEmail from './test-chatbot-email'

export const ContactFromMailSenderCopy = (props: FormInputSchema) => {
  if (props.kind === 'testChatbot') {
    return <TestChatbotEmail />
  }

  return <StandardContactEmail {...props} />
}

export default ContactFromMailSenderCopy

ContactFromMailSenderCopy.PreviewProps = {
  kind: 'apptiva',
  name: 'Tamara Tester',
  email: 'tamara@gmail.com',
  message:
    'Guten Tag, ich interessiere mich für eine Beratung zu einer neuen App für unser Unternehmen. Wir möchten unsere internen Prozesse digitalisieren. Wann wäre ein erstes Gespräch möglich?',
  company: 'Beispiel AG',
  referrer: 'Google Suche',
  subject: 'Kontaktformular apptiva.ch',
  circle: 'apptiva',
} satisfies FormInputSchema
