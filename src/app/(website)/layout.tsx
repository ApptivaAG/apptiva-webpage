import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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

const navbarData = [
  {
    title: 'Angebot',
    href: '/angebot/',
    type: 'one',
    items: [
      {
        title: 'Development',
        text: '',
        href: '/development/',
      },
      {
        title: 'Chatbot',
        text: '',
        href: '/chatbot/',
      },
      {
        title: 'Consulting',
        text: '',
        href: '/consulting/',
      },
    ],
  },
  { title: 'Projekte', href: '/projekte/' },
  {
    title: 'Apptiva',
    href: '/ueber-uns/',
    type: 'two',
    items: [
      {
        title: 'Kultur & Firmenfacts',
        text: 'Mehr über uns erfahren',
        href: '/ueber-uns/',
      },
      {
        title: 'Team',
        text: 'Unser erfahrenes Entwicklungsteam',
        href: '/ueber-uns/#team',
      },
      {
        title: 'Kompetenzen',
        text: 'Dies sind unsere Kompetenzen',
        href: '/unsere-kompetenzen/',
      },
      {
        title: 'Jobs',
        text: 'Jetzt bewerben',
        href: '/jobs/',
      },
    ],
  },
  { title: 'Kontakt', href: '/kontakt/' },
  { title: 'Blog', href: '/blog/' },
  {
    title: 'Wissen',
    href: '/wissen/',
    items: [
      {
        title: 'FAQ',
        href: '/faq/',
      },
    ],
  },
  { title: 'CMS', href: '/studio/' },
]

const inter = Inter({ subsets: ['latin'] })

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
      </body>
    </html>
  )
}
