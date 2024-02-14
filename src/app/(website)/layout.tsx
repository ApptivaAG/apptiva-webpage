import Footer from '@/components/footer'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
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
  metadataBase: new URL('https://apptiva.ch'),
  title: 'Apptiva AG',
  description: 'Webseite der Apptiva AG',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={gentona.className}>
      <body>
        <Navbar></Navbar>
        <div className="content">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
