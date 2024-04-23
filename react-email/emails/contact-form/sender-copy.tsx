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

interface ContactFromMailSenderCopyProps {
  name: string
  message: string
}

export const ContactFromMailSenderCopy = ({
  name,
  message,
}: ContactFromMailSenderCopyProps) => (
  <Html>
    <Head />
    <Preview>Danke für deine Nachricht!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://cdn.sanity.io/images/g5oll5fh/production/389335468433792ed23b3533b27f583bfca0ccb4-1198x630.png`}
          alt="Apptiva Logo"
          style={logo}
        />
        <Text style={title}>
          <Heading style={heading}>
            Hoi <strong>{name}</strong>, danke für deine Nachricht!
          </Heading>
          <Text style={text}>Wir melden uns schon bald bei dir.</Text>
          <Text style={text}>
            Mit einem Schwung von Nullen und Einsen 🤓.
            <br /> Das Apptiva Team
          </Text>
        </Text>
        <Container style={container}>
          <Text style={text}>Deine Nachricht:</Text>
          <Text style={review}>{message}</Text>
        </Container>
      </Container>
    </Body>
  </Html>
)

export default ContactFromMailSenderCopy

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
  lineHeight: '1.3',
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
const title = {
  fontSize: '24px',
  lineHeight: 1.25,
}

const text = {
  margin: '0 0 10px 0',
  textAlign: 'left' as const,
}
