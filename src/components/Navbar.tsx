'use client'

import { ChevronDownIcon, ChevronUpIcon } from '@sanity/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import apptivaLogo from './logo.svg'
import Button from './ui/button'

const navbarData = [
  {
    title: 'Angebot',
    href: '/angebot/',
    type: 'one',
    items: [
      {
        title: 'Development',
        text: '',
        href: '/angebot/development',
      },
      {
        title: 'Chatbots',
        text: '',
        href: '/angebot/chatbots',
      },
    ],
  },
  { title: 'Projekte', href: '/projekte' },
  { title: 'Apptiva', href: '/ueber-uns' },
  { title: 'Blog', href: '/blog' },
]

const Navbar = () => {
  const [showOffers, setShowOffers] = useState(false)

  return (
    <div className="fixed z-50 w-full p-4">
      <div className="flex items-center justify-between rounded-md bg-primary-dark/40 px-8 py-6 text-base-white backdrop-blur-[6px]">
        <Link href={'/'}>
          <Image
            priority
            src={apptivaLogo}
            alt="Apptiva Logo"
            className="w-32"
          />
        </Link>
        <nav className="flex justify-between gap-8 rounded bg-primary px-8 py-3">
          {navbarData.map((item) =>
            item.type === 'one' ? (
              <div key={item.href} onClick={() => setShowOffers(!showOffers)}>
                <ul key={item.href}>
                  <li key={item.href} className="relative flex flex-col">
                    <div
                      key={item.href}
                      className={`flex cursor-pointer items-center gap-1 ${showOffers ? 'text-secondary' : ''}`}
                    >
                      {item.title}{' '}
                      <span className="text-[1.5rem]">
                        {showOffers ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      </span>
                    </div>
                    {showOffers && (
                      <ul className="full absolute left-[-2rem] right-[-16.75rem] top-10 rounded bg-primary p-4 ">
                        {item.items.map((subitem) => (
                          <li key={subitem.href}>
                            <Link href={subitem.href}>{subitem.title}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
            ) : (
              <Link key={item.href} href={item.href}>
                {item.title}
              </Link>
            )
          )}
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
