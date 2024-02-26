'use client'

import Image from 'next/image'
import NextLink, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
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
      <NextLink href={'/'}>
        <Image priority src={apptivaLogo} alt="Apptiva Logo" className="w-32" />
      </NextLink>

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
                        <Link href={subitem.href} key={subitem.href}>
                          {subitem.title}
                        </Link>
                      ))}
                    </NavigationMenuContent>
                  )}
                </>
              ) : (
                <Link href={item.href}>{item.title}</Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <NextLink href={'/kontakt/'}>
        <Button element="div" intent="secondary">
          Kontakt
        </Button>
      </NextLink>
    </div>
  </div>
)

const Link = (props: LinkProps & { children: React.ReactNode }) => {
  const { href, ...rest } = props
  const pathname = usePathname()
  const isActive = href === pathname

  return (
    <NavigationMenuLink asChild active={isActive}>
      <NextLink href={href} className="NavigationMenuLink" {...rest} />
    </NavigationMenuLink>
  )
}

export default Navbar
