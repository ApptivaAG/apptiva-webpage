import { Metadata } from 'next'
import Wrapper from '../wrapper'
import Content from './content.mdx'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Wir nehmen den Schutz Ihrer Personendaten sehr ernst. Die Beachtung der Privatsphäre und der vertrauensvolle Umgang mit ihren Personendaten ist uns ein wichtiges Anliegen. Das Einhalten der gesetzlichen Bestimmungen zum Datenschutz ist für uns selbstverständlich. Nachfolgend geben wir Ihnen einen Überblick darüber, wie wir den Schutz Ihrer Personendaten gewährleisten und welche Ihrer Daten wir zu welchem Zweck bearbeiten.',
  alternates: { canonical: '/datenschutzerklaerung' },
  openGraph: {
    title: 'Datenschutzerklärung',
    url: '/datenschutzerklaerung',
  },
}

export default function Datenschutzerklärung() {
  return (
    <Wrapper meta={metadata}>
      <Content />
    </Wrapper>
  )
}
