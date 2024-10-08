'use client'

import { cn } from '@/utils/cn'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { navbarData } from './Navbar'
import apptivaLogo from './logo.svg'
import navBurger from './nav-burger.svg'
import { Accordion, AccordionContent, AccordionItem } from './ui/accordion'
import Button from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

const MobileNav = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Image
          priority
          src={navBurger}
          alt="Toggle Menu"
          className="w-10 lg:hidden"
        />
      </SheetTrigger>

      <SheetContent side="right">
        <div className="flex h-full flex-col gap-12">
          <MobileLink
            href="/"
            className="flex items-center pl-2"
            onOpenChange={setOpen}
          >
            <Image
              priority
              src={apptivaLogo}
              alt="Apptiva Logo"
              className="w-32"
            />
          </MobileLink>
          <div className="flex-1 space-y-10 overflow-y-auto overflow-x-clip">
            <div className="text-base-white">
              <div className="flex flex-col">
                {navbarData.map((item, index) => (
                  <div key={index}>
                    <div className="flex flex-col pb-5 pt-4 focus:outline-none">
                      {item.type === 'menu' ? (
                        <Accordion
                          className="w-full"
                          transition
                          transitionTimeout={200}
                        >
                          <AccordionItem
                            header={
                              <div className="group flex w-full justify-between p-0 text-xl !no-underline focus:outline-none">
                                {item.title}
                              </div>
                            }
                            className="p-0 outline-none transition-colors duration-700 hover:no-underline aria-expanded:text-secondary"
                          >
                            <AccordionContent className="mt-4 flex flex-col divide-y divide-base-white/40 rounded bg-base-white/5 px-4">
                              {item.items
                                .filter((item) => item.type === 'media-link')
                                .map((subitem) => (
                                  <MobileLink
                                    href={subitem.href}
                                    onOpenChange={setOpen}
                                    className="flex items-center gap-5 py-4"
                                    key={subitem.href}
                                  >
                                    <Image
                                      src={subitem.icon}
                                      alt={subitem.title}
                                      className="size-24"
                                    />
                                    <div className="">
                                      <p className="text-lg">{subitem.title}</p>
                                      <p className="text-xs">{subitem.text}</p>
                                    </div>
                                  </MobileLink>
                                ))}
                              {item.items
                                .filter((item) => item.type === 'link')
                                .map((subitem) => (
                                  <MobileLink
                                    href={subitem.href}
                                    onOpenChange={setOpen}
                                    className="flex items-center gap-5 py-4"
                                    key={subitem.href}
                                  >
                                    <p className="text-lg">{subitem.title}</p>
                                  </MobileLink>
                                ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <MobileLink
                          href={item.href}
                          onOpenChange={setOpen}
                          className="text-xl"
                        >
                          {item.title}
                        </MobileLink>
                      )}
                    </div>
                    <hr className="text-base-white/40" />
                  </div>
                ))}
              </div>
            </div>
            <MobileLink
              href="/kontakt/"
              onOpenChange={setOpen}
              className="block text-xl"
            >
              <Button
                element="div"
                intent="secondary"
                className="text-center text-primary"
              >
                Kontakt
              </Button>
            </MobileLink>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export default MobileNav
