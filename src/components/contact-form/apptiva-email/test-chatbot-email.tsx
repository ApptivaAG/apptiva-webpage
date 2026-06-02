import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'

export default function TestChatbotEmail(props: { email: string }) {
  return (
    <Html>
      <Head />
      <Preview>Anfrage für Chatbot-Test</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            Neue Anfrage für einen <strong>Chatbot-Test</strong>
          </Heading>

          <Container style={container}>
            <Text style={paragraph}>
              Jemand möchte den Chatbot testen und hat folgende E-Mail-Adresse
              hinterlassen:
            </Text>
            <Text style={{ ...paragraph, marginTop: 20 }}>
              <b>E-Mail Adresse: </b>
              {String(props.email)}
            </Text>
          </Container>
        </Container>
      </Body>
    </Html>
  )
}

TestChatbotEmail.PreviewProps = {
  email: 'test.user@example.com',
} satisfies { email: string }

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
