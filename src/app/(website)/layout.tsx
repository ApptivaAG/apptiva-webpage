import { DisableDraftMode } from '@/components/disable-draft-mode'
import Footer from '@/components/footer'
import { organizationSchema } from '@/lib/schema/organization'
import type { Metadata } from 'next'
import PlausibleProvider from 'next-plausible'
import { VisualEditing } from 'next-sanity/visual-editing'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import Script from 'next/script'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { JsonLd } from 'react-schemaorg'
import { description, rootUrl, title } from '../env'
import Navbar from './../../components/Navbar'
import './globals.css'
import { Schema } from '@/components/schema'

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={gentona.className}>
      <head>
        <PlausibleProvider domain="apptiva.ch" />
      </head>
      <body className="text-fluid-base">
        <Schema data={organizationSchema} />
        <Navbar />
        <NuqsAdapter>
          {/* The main content has to be higher in the z-index, so that the content coming after the footer is behind the main content */}
          <main className="content relative z-10 bg-base-white">
            {children}
          </main>
        </NuqsAdapter>
        <Footer />
        {(await draftMode()).isEnabled ? (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        ) : (
          <Script
            id="chatbot"
            data-server="https://chatbot.apptiva.ch/chatbot"
            strategy="lazyOnload"
            defer
            src="https://chatbot.apptiva.ch/chatbot/embed/bundle.js"
          />
        )}
      </body>
    </html>
  )
}
