import { FormInputSchema } from '@/components/server-actions/send-mail'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'

export default function StandardContactEmail(
  props: Exclude<FormInputSchema, { kind: 'testChatbot' }>
) {
  return (
    <Html>
      <Head />
      <Preview>Danke für deine Nachricht!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            <strong>{String(props.name)}</strong> hat uns eine Nachricht
            hinterlassen:
          </Heading>

          <Container style={container}>
            <Text style={review}>{String(props.message)}</Text>
            <Text style={{ ...paragraph, marginTop: 40 }}>
              <b>Name: </b>
              {String(props.name)}
            </Text>
            <Text style={{ ...paragraph, marginTop: -5 }}>
              <b>E-Mail Adresse: </b>
              {String(props.email)}
            </Text>
            <Text style={{ ...paragraph, marginTop: -5 }}>
              <b>Unternehmen: </b>
              {props.company ? String(props.company) : 'keine Angabe'}
            </Text>
            <Text style={{ ...paragraph, marginTop: -5 }}>
              <b>Referenz (Wie hast du uns gefunden): </b>
              {props.referrer ? String(props.referrer) : 'keine Angabe'}
            </Text>
            {props.circle === 'bubble' && (
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>Telefonnummer: </b>
                {props.phone ? String(props.phone) : 'keine Angabe'}
              </Text>
            )}
          </Container>
        </Container>
      </Body>
    </Html>
  )
}

StandardContactEmail.PreviewProps = {
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

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  maxWidth: '480px',
  margin: '0 auto',
  padding: '20px 0 48px',
}

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: 1.25,
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
}

const paragraph = {
  margin: '0 0 15px',
  fontSize: '15px',
  lineHeight: '1.4',
  color: '#3c4149',
}

const review = {
  ...paragraph,
  padding: '24px',
  backgroundColor: '#f2f3f3',
  borderRadius: '4px',
}
