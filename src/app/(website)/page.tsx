import { Metadata } from 'next'
import Hero from '@/app/(website)/_root/hero'
import { rootUrl } from '../env'
import ModulesPage from './modules/page'

const title =
  'Apptiva AG | KI-Chatbots & individuelle Softwareentwicklung aus Luzern'
const ogImage = new URL('/img/Logo-symbol.png', rootUrl).toString()
export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  openGraph: {
    title,
    description:
      'Digitale Lösungen mit Mehrwert: Die Apptiva entwickelt KI-gestützte Software, Kundenportale und Automatisierungen für Schweizer Unternehmen.',
    url: rootUrl,
    images: [ogImage],
  },
}

export default async function Home() {
  return (
    <>
      <Hero />
      <ModulesPage />
    </>
  )
}
