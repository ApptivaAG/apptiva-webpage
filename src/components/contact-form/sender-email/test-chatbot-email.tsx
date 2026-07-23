import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
} from '@react-email/components'

export default function TestChatbotEmail() {
  return (
    <Html>
      <Head />
      <Preview>Dein Test-Chatbot wird eingerichtet!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://cdn.sanity.io/images/g5oll5fh/production/389335468433792ed23b3533b27f583bfca0ccb4-1198x630.png`}
            alt="Apptiva Logo"
            style={logo}
          />
          <Heading style={heading}>
            Dein Test-Chatbot wird eingerichtet!
          </Heading>
          <Text style={text}>
            Wir richten gerade deinen Test-Chatbot ein und melden uns in ein bis
            zwei Tagen bei dir.
          </Text>
          <Text style={text}>
            Mit einem Schwung von Nullen und Einsen 🤓.
            <br /> Das Apptiva Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

TestChatbotEmail.PreviewProps = {}

const logo = {
  borderRadius: 21,
  width: '30%',
  height: 'auto',
}

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

const text = {
  margin: '0 0 10px 0',
  textAlign: 'left' as const,
}
