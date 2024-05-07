import Hero from '@/app/(website)/_root/hero'

import ModulesPage from './modules/page'
import { Metadata } from 'next'

const title =
  'Apptiva AG | Chatbots und individuelle Softwarelösungen aus der Schweiz'
export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  openGraph: {
    title,
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
