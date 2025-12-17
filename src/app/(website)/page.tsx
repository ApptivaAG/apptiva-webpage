import Hero from '@/app/(website)/_root/hero'

import ModulesPage from './modules/page'
import { Metadata } from 'next'
import { rootUrl } from '../env'

const title =
  'Apptiva AG | Chatbots und individuelle Softwarelösungen aus der Schweiz'
const ogImage = new URL('/img/Logo-symbol.png', rootUrl).toString()
export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  openGraph: {
    title,
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
