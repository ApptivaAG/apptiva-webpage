'use client'

import { ChevronDownIcon, ChevronUpIcon } from '@sanity/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import apptivaLogo from './logo.svg'
import Button from './ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'

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

const Navbar = () => (
  <div className="fixed z-50 w-full p-4">
    <div className="flex items-center justify-between rounded-md bg-primary-dark/40 px-8 py-6 text-base-white backdrop-blur-[6px]">
      <Link href={'/'}>
        <Image priority src={apptivaLogo} alt="Apptiva Logo" className="w-32" />
      </Link>

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {navbarData.map((item) => (
            <NavigationMenuItem key={item.href}>
              {item.type === 'one' ? (
                <>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  {item.items && (
                    <NavigationMenuContent className="full left-0 right-0 top-0 flex flex-col bg-primary p-4">
                      {item.items.map((subitem) => (
                        <NavigationMenuLink
                          href={subitem.href}
                          key={subitem.href}
                        >
                          {subitem.title}
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  )}
                </>
              ) : (
                <NavigationMenuLink href={item.href}>
                  {item.title}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <Link href={'/kontakt/'}>
        <Button element="div" intent="secondary">
          Kontakt
        </Button>
      </Link>
    </div>
  </div>
)

export default Navbar
