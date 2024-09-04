'use client'

import Image from 'next/image'
import NextLink from 'next/link'
import chatbotsIconPrimary from './chatbots-primary.svg'
import chatbotsIcon from './chatbots.svg'
import developmentIcon from './development.svg'
import wissenIcon from './icon-wissen.svg'
import apptivaLogo from './logo.svg'
import MainNav from './main-nav'
import MobileNav from './mobile-nav'
import Button from './ui/button'

type NavbarCTALink = {
  type: 'cta-link'
  title: string
  href: string
  text: string
}

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
type NavbarItemLink =
  | NavbarItemSimpleLink
  | NavbarItemLinkWithMedia
  | NavbarCTALink
type NavbarItemMenu = {
  type: 'menu'
  title: string
  items: NavbarItemLink[]
}

type NavbarItem = NavbarItemLink | NavbarItemMenu
export const navbarData: NavbarItem[] = [
  {
    title: 'Development',
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
        title: 'Webentwicklung',
        href: '/angebot/development/webentwicklung',
        type: 'link',
      },
      {
        title: 'App Entwicklung',
        href: '/angebot/development/app-entwicklung',
        type: 'link',
      },
      {
        title: 'Schnittstellen',
        href: '/angebot/development/schnittstellen',
        type: 'link',
      },
      {
        title: 'Konfiguratoren',
        href: '/angebot/development/konfiguratoren',
        type: 'link',
      },
      {
        title: 'Webshops',
        href: '/angebot/development/webshops',
        type: 'link',
      },
      {
        title: 'Digitalisierung',
        href: '/angebot/development/digitalisierung',
        type: 'link',
      },
      {
        title: 'Weiterentwicklung',
        href: '/angebot/development/weiterentwicklung',
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
        title: 'Content Management System',
        href: '/angebot/chatbots/chatbot-content-management',
        type: 'link',
      },
      {
        title: 'Live-Chat',
        href: '/angebot/chatbots/live-chat',
        type: 'link',
      },
      {
        title: 'Analytics',
        href: '/angebot/chatbots/chatbot-analytics',
        type: 'link',
      },
      {
        title: 'Preise',
        href: '/angebot/chatbots',
        type: 'link',
      },
      {
        title: 'Technologie',
        href: '/angebot/chatbots/technologie',
        type: 'link',
      },
      {
        title: 'Kostenlose Demo buchen',
        text: 'Kostenlose Demo buchen',
        href: '/angebot/chatbots/demo-vereinbaren',
        type: 'cta-link',
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
        title: 'Know-How',
        text: 'Wissen wird bei uns gross geschrieben.',
        href: '/wissen',
        icon: wissenIcon,
        type: 'media-link',
      },
      {
        title: 'Blog',
        href: '/blog',
        type: 'link',
      },
      {
        title: 'Apptiva Lernt',
        href: '/apptiva-lernt',
        type: 'link',
      },
      {
        title: 'Glossar',
        href: '/glossar',
        type: 'link',
      },
      {
        title: 'Workshops',
        href: '/angebot/workshops',
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
