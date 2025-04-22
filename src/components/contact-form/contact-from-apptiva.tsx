import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import { FormInputSchema } from '../server-actions/send-mail'

export const ContactFromMailApptivaCopy = (props: FormInputSchema) => (
  <Html>
    <Head />
    <Preview>Danke für deine Nachricht!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={title}>
          <Heading style={heading}>
            <strong>{props.name}</strong> hat uns eine Nachricht hinterlassen:
          </Heading>
        </Text>

        <Container style={container}>
          <Text style={review}>{props.message}</Text>
          <Text style={{ ...paragraph, marginTop: 40 }}>
            <b>Name: </b>
            {props.name}
          </Text>
          <Text style={{ ...paragraph, marginTop: -5 }}>
            <b>E-Mail Adresse: </b>
            {props.email}
          </Text>
          <Text style={{ ...paragraph, marginTop: -5 }}>
            <b>Unternehmen: </b>
            {props.company ?? 'keine Angabe'}
          </Text>
          {props.circle === 'bubble' && (
            <Text style={{ ...paragraph, marginTop: -5 }}>
              <b>Telefonnummer: </b>
              {props.phone ?? 'keine Angabe'}
            </Text>
          )}
        </Container>
      </Container>
    </Body>
  </Html>
)

export default ContactFromMailApptivaCopy

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
