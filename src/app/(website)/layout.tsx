import Footer from '@/components/footer'
import LiveVisualEditing from '@/components/live-visual-editing'
import type { Metadata } from 'next'
import PlausibleProvider from 'next-plausible'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import Script from 'next/script'
import { description, rootUrl, title } from '../env'
import Navbar from './../../components/Navbar'
import './globals.css'

const gentona = localFont({
  src: [
    {
      path: './font/Gentona-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './font/Gentona-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './font/Gentona-Heavy.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  metadataBase: new URL(rootUrl),
  title: {
    template: `%s | ${title}`,
    default: title,
  },
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: rootUrl,
    siteName: title,
    locale: 'de_CH',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={gentona.className}>
      <head>
        <PlausibleProvider domain="apptiva.ch" />
      </head>
      <body className="text-lg">
        <Navbar />
        <main className="content">{children}</main>
        <Footer />
        {draftMode().isEnabled ? (
          <LiveVisualEditing />
        ) : (
          // <Script
          //   id="chatbot"
          //   data-server="https://chatbot.apptiva.ch/chatbot"
          //   strategy="lazyOnload"
          //   defer
          //   src="https://chatbot.apptiva.ch/chatbot/embed/bundle.js"
          // />
          ''
        )}
      </body>
    </html>
  )
}
