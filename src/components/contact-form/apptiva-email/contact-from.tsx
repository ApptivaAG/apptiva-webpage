import { FormInputSchema } from '@/components/server-actions/send-mail'
import StandardContactEmail from './standard-contact-email'
import TestChatbotEmail from './test-chatbot-email'

export const ContactFromMailApptivaCopy = (props: FormInputSchema) => {
  if (props.kind === 'testChatbot') {
    return <TestChatbotEmail email={props.email} />
  }

  return <StandardContactEmail {...props} />
}

export default ContactFromMailApptivaCopy

ContactFromMailApptivaCopy.PreviewProps = {
  kind: 'apptiva',
  name: 'Tamara Tester',
  email: 'tamara.tester@example.com',
  message:
    'Hallo Apptiva Team, ich habe von euch gehört und würde gerne mehr über eure Dienstleistungen erfahren. Besonders interessiert mich die App-Entwicklung für kleine und mittlere Unternehmen. Können wir einen Termin vereinbaren?',
  company: 'Test GmbH',
  referrer: 'Empfehlung',
  subject: 'Kontaktformular apptiva.ch',
  circle: 'apptiva',
} satisfies Exclude<FormInputSchema, { kind: 'testChatbot' }>
