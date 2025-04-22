import { Metadata } from 'next'
import Wrapper from '../wrapper'
import Content from './content.mdx'

export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Impressum der Webseite der Apptiva AG. Kontakt: Apptiva AG, Obergrundstrasse 73, 6003 Luzern, Schweiz, 041 322 26 26, info@apptiva.ch',
  alternates: { canonical: '/impressum' },
  openGraph: {
    title: 'Impressum',
    url: '/impressum',
  },
}

export default function Impressum() {
  return (
    <Wrapper meta={metadata}>
      <Content />
    </Wrapper>
  )
}
