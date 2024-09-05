'use client'

import Image from 'next/image'
import NextLink from 'next/link'
import chatbotsIconPrimary from './chatbots-primary.svg'
import chatbotsIcon from './chatbots.svg'
import developmentIcon from './development.svg'
import apptivaLogo from './logo.svg'
import MainNav from './main-nav'
import MobileNav from './mobile-nav'
import Button from './ui/button'

export const navbarData = [
  {
    title: 'Angebot',
    href: '/angebot/',
    type: 'one',
    items: [
      {
        title: 'Development',
        text: 'Gemeinsam realisieren wir deine individuelle Softwarelösung.',
        href: '/angebot/development',
        icon: developmentIcon,
      },
      {
        title: 'Chatbots',
        text: 'Kundenanfragen mit künstlicher Intelligenz beantworten.',
        href: '/angebot/chatbots',
        icon: chatbotsIcon,
        iconPrimary: chatbotsIconPrimary,
      },
    ],
  },
  { title: 'Projekte', href: '/projekte' },
  { title: 'Apptiva', href: '/ueber-uns' },
  { title: 'Wissen', href: '/wissen' },
]

const Navbar = () => (
  <div className="fixed z-50 w-full p-4">
    <div className="flex items-center justify-between rounded-md bg-primary/80 px-8 py-6 text-base-white backdrop-blur-[6px]">
      <NextLink href={'/'}>
        <Image priority src={apptivaLogo} alt="Apptiva Logo" className="w-32" />
      </NextLink>

      <MainNav />
      <MobileNav />

      <NextLink href={'/kontakt'} className="hidden md:block">
        <Button element="div" intent="secondary">
          Kontakt
        </Button>
      </NextLink>
    </div>
  </div>
)

export default Navbar
