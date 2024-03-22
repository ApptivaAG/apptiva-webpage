import * as React from 'react'

interface EmailTemplateProps {
  name: string
  message: string
}

export const ContactEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  message,
}) => (
  <div className=" font-sans">
    <h1>Hoi {name}!</h1>
    <p>
      Danke für deine Nachricht. Wir melden uns schon bald bei dir.
      <br />
      <br />
      GaLiGrü
      <br />
      Das Apptiva Team
    </p>
    <br />
    <hr />
    <br />
    Deine Nachricht:
    <br />
    {message}
  </div>
)
