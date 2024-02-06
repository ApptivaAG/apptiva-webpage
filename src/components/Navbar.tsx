'use client'

import Link from 'next/link'
import apptivaLogo from './logo.svg'
import Image from 'next/image'
import Button from './button'
import { useState } from 'react'

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
  { title: 'Blog', href: '/blog/' },
]

const Navbar = () => {
  const [activeNavigationItem, setActiveNavigationItem] = useState<
    string | undefined
  >(undefined)

  return (
    <div className="fixed w-full p-4">
      <div className="flex items-center justify-between rounded-md bg-[#053A78dd] px-8 py-6 text-base-white backdrop-blur-[6px]">
        <Link href={'/'}>
          <Image
            priority
            src={apptivaLogo}
            alt="Apptiva Logo"
            className="w-32"
          />
        </Link>
        <nav className="flex justify-between gap-8 rounded bg-black/40 px-8 py-3">
          {navbarData.map((item) => (
            <div
              key={item.href}
              onMouseOver={() => setActiveNavigationItem(item.href)}
              onMouseOut={() => setActiveNavigationItem(undefined)}
            >
              <ul key={item.href}>
                <li key={item.href} className="relative">
                  <Link key={item.href} href={item.href}>
                    {item.title}
                  </Link>
                  {activeNavigationItem === item.href && item.items && (
                    <div className="absolute left-[-1rem] rounded bg-primary-dark">
                      <ul className="rounded bg-black/40 p-4">
                        {item.items.map((subitem) => (
                          <li key={subitem.href}>
                            <Link href={subitem.href}>{subitem.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          ))}
        </nav>
        <Link href={'/kontakt/'}>
          <Button element="div" intent="secondary">
            Kontakt
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
