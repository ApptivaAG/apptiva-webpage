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

type NavbarItemSimpleLink = {
  type: 'link'
  title: string
  href: string
}
type NavbarItemLinkWithMedia = {
  type: 'media-link'
  title: string
  href: string
  text: string
  icon: any
}
type NavbarItemLink = NavbarItemSimpleLink | NavbarItemLinkWithMedia
type NavbarItemMenu = {
  type: 'menu'
  title: string
  items: NavbarItemLink[]
}

type NavbarItem = NavbarItemLink | NavbarItemMenu
export const navbarData: NavbarItem[] = [
  {
    title: 'Entwicklung',
    type: 'menu',
    items: [
      {
        title: 'Development',
        text: 'Gemeinsam realisieren wir deine individuelle Softwarelösung.',
        href: '/angebot/development',
        icon: developmentIcon,
        type: 'media-link',
      },

      {
        title: 'Schnittstellen',
        href: '/angebot/chatbots',
        type: 'link',
      },
      {
        title: 'Konfiguratoren',
        href: '/angebot/chatbots',
        type: 'link',
      },
      {
        title: 'Webshops',
        href: '/angebot/chatbots',
        type: 'link',
      },
      {
        title: 'Digitalisierung',
        href: '/angebot/chatbots',
        type: 'link',
      },
      {
        title: 'Weiterentwicklung',
        href: '/angebot/chatbots',
        type: 'link',
      },
    ],
  },
  {
    title: 'Chatbots',
    type: 'menu',
    items: [
      {
        title: 'Chatbots',
        text: 'Kundenanfragen mit künstlicher Intelligenz beantworten.',
        href: '/angebot/chatbots',
        icon: chatbotsIcon,
        type: 'media-link',
      },
      {
        title: 'Analytics',
        href: '/angebot/chatbots',
        type: 'link',
      },
      {
        title: 'Preise',
        href: '/angebot/chatbots',
        type: 'link',
      },
      {
        title: 'Technologie',
        href: '/angebot/chatbots',
        type: 'link',
      },
      {
        title: 'Kostenlose Demo buchen',
        href: '/angebot/chatbots',
        type: 'link',
      },
    ],
  },
  { title: 'Projekte', href: '/projekte', type: 'link' },
  { title: 'Apptiva', href: '/ueber-uns', type: 'link' },
  {
    title: 'Wissen',
    type: 'menu',
    items: [
      // Blog, Apptiva lernt, Glossar, Workshops
      {
        title: 'Wissen',
        text: 'Gemeinsam realisieren wir deine individuelle Softwarelösung.',
        href: '/angebot/development',
        icon: developmentIcon,
        type: 'media-link',
      },
      {
        title: 'Blog',
        href: '/angebot/development',
        type: 'link',
      },
      {
        title: 'Apptiva Lernt',
        href: '/angebot/chatbots',
        type: 'link',
      },
      {
        title: 'Glossar',
        href: '/angebot/chatbots',
        type: 'link',
      },
      {
        title: 'Workshops',
        href: '/angebot/chatbots',
        type: 'link',
      },
    ],
  },
]

const Navbar = () => (
  <div className="fixed z-50 w-full p-4">
    <div className="flex items-center justify-between rounded-md bg-primary/80 px-8 py-6 text-base-white backdrop-blur-[6px]">
      <NextLink href={'/'}>
        <Image priority src={apptivaLogo} alt="Apptiva Logo" className="w-32" />
      </NextLink>

      <MainNav />
      <MobileNav />

      <NextLink href={'/kontakt/'} className="hidden md:block">
        <Button element="div" intent="secondary">
          Kontakt
        </Button>
      </NextLink>
    </div>
  </div>
)

export default Navbar
