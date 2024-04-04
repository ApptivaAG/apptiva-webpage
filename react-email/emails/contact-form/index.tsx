import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

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
            Mit einem Schwung von Nullen und Einsen.
            <br /> Das Apptiva Team
          </Text>
          <br />
        </Text>
        <Section style={section}>
          <Text style={text}>Deine Nachricht:</Text>
          <Text style={text}>{message}</Text>
        </Section>

        {/* <code style={code}>code code code</code> */}
        <Container style={container}></Container>
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

const imageContainer = {
  maxWidth: '480px',
  width: '100%',
}

const container = {
  // margin: '0 auto',
  // padding: '20px 0 48px',
  // maxWidth: '560px',
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

const buttonContainer = {
  padding: '27px 0 27px',
}

const button = {
  backgroundColor: '#5e6ad2',
  borderRadius: '3px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '11px 23px',
}

const reportLink = {
  fontSize: '14px',
  color: '#b4becc',
}

const hr = {
  borderColor: '#dfe1e4',
  margin: '5px 0 26px',
}

const code = {
  fontFamily: 'monospace',
  fontWeight: '700',
  padding: '1px 4px',
  backgroundColor: '#dfe1e4',
  letterSpacing: '-0.3px',
  fontSize: '21px',
  borderRadius: '4px',
  color: '#3c4149',
}

const title = {
  fontSize: '24px',
  lineHeight: 1.25,
}

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  marginBlock: '15px',
  textAlign: 'center' as const,
}

const text = {
  margin: '0 0 10px 0',
  textAlign: 'left' as const,
}
