'use client'

import Image from 'next/image'
import NextLink from 'next/link'
import chatbotsIcon from './chatbots.svg'
import developmentIcon from './development.svg'
import wissenIcon from './icon-wissen.svg'
import apptivaLogo from './logo.svg'
import MainNav from './main-nav'
import MobileNav from './mobile-nav'
import ChatInput from './chat-input'

export type NavbarCTALink = {
  type: 'cta-link'
  title: string
  href: string
  text: string
}

export type NavbarItemSimpleLink = {
  type: 'link'
  title: string
  href: string
}
export type NavbarItemLinkWithMedia = {
  type: 'media-link'
  title: string
  href: string
  text: string
  icon: any
}
export type NavbarItemSubMenu = {
  type: 'sub-menu'
  title: string
  items: NavbarItemSimpleLink[]
}
export type NavbarItemLink =
  | NavbarItemSimpleLink
  | NavbarItemLinkWithMedia
  | NavbarCTALink

export type NavbarItemMenu = {
  type: 'menu'
  title: string
  items: (NavbarItemLink | NavbarItemSubMenu)[]
}

type NavbarItem = NavbarItemLink | NavbarItemMenu
export const navbarData: NavbarItem[] = [
  {
    title: 'KI-Chatbot',
    type: 'menu',
    items: [
      {
        title: 'Unternehmens-Chatbot',
        text: 'Schweizer KI-Chatbot mit Branchenverständnis',
        href: '/angebot/chatbots',
        icon: chatbotsIcon,
        type: 'media-link',
      },
      {
        title: 'Angebot',
        href: '/angebot/chatbots',
        type: 'link',
      },
      {
        title: 'Branchen',
        type: 'sub-menu',
        items: [
          {
            title: 'Verwaltung & Public Sector',
            href: '/angebot/chatbots/verwaltung',
            type: 'link',
          },
          {
            title: 'Gesundheitswesen',
            href: '/angebot/chatbots/gesundheitswesen',
            type: 'link',
          },
          {
            title: 'Bildungswesen',
            href: '/angebot/chatbots/bildungswesen',
            type: 'link',
          },
        ],
      },
      {
        title: 'Referenzen',
        href: '/projekte?category=chatbots',
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
  {
    title: 'Business-KI & Apps',
    type: 'menu',
    items: [
      {
        title: 'Individuelle\nSoftware\u00ADentwicklung',
        text: 'Gemeinsam optimieren wir dein Unternehmen mit KI und Apps.',
        href: '/angebot/development',
        icon: developmentIcon,
        type: 'media-link',
      },
      {
        title: 'Angebot',
        href: '/angebot/development',
        type: 'link',
      },
      {
        title: 'KI-Agenten',
        href: '/angebot/development/ki-agenten',
        type: 'link',
      },
      {
        title: 'KI-Integration',
        href: '/angebot/development/ki-integration',
        type: 'link',
      },
      {
        title: 'Web- und App-Entwicklung',
        href: '/angebot/development/web-app-entwicklung',
        type: 'link',
      },
      {
        title: 'Referenzen',
        href: '/projekte?category=dev',
        type: 'link',
      },
    ],
  },

  { title: 'Über uns', href: '/ueber-uns', type: 'link' },
  {
    title: 'Wissen',
    type: 'menu',
    items: [
      // Blog, Apptiva lernt, Glossar, Workshops
      {
        title: 'Wissen',
        text: 'Know-how wird bei uns gross geschrieben.',
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
      // todo: as soon as media page content is ready, uncomment these lines
      // {
      //   title: 'Media',
      //   href: '/media',
      //   type: 'link',
      // },
      // {
      //   title: 'Workshops',
      //   href: '/angebot/workshops',
      //   type: 'link',
      // },
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
      <div className="max-2xl:hidden">
        <ChatInput mode="inline-input" size="sm" />
      </div>
    </div>
  </div>
)

export default Navbar
