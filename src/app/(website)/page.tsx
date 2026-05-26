import Hero from '@/app/(website)/_root/hero'

import ModulesPage from './modules/page'
import { Metadata } from 'next'
import { rootUrl } from '../env'
import ChatInput from '@/components/chat-input'

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
      <section className="full bg-base-grey pb-16 pt-8">
        <div className="content">
          <ChatInput />
        </div>
      </section>
      <ModulesPage />
    </>
  )
}
