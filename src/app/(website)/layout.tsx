import Footer from '@/components/footer'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Navbar from './../../components/Navbar'
import './globals.css'
import { draftMode } from 'next/headers'
import LiveVisualEditing from '@/components/live-visual-editing'
import { description, rootUrl, title } from '../env'

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
      <body className="text-lg">
        <Navbar />
        <main className="content">{children}</main>
        <Footer />
        {draftMode().isEnabled && <LiveVisualEditing />}
      </body>
    </html>
  )
}
