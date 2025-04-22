'use client'

import Image from 'next/image'
import * as React from 'react'
import { navbarData } from './Navbar'
import apptivaLogo from './logo.svg'
import { MediaLink, MobileLink, SimpleLink, SubMenu } from './mobile-nav-items'
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
                                  <MediaLink
                                    subitem={subitem}
                                    setOpen={setOpen}
                                    key={subitem.title + index}
                                  />
                                ))}
                              {item.items
                                .filter(
                                  (item) =>
                                    item.type === 'link' ||
                                    item.type === 'sub-menu'
                                )
                                .map((subitem) => {
                                  switch (subitem.type) {
                                    case 'link':
                                      return (
                                        <SimpleLink
                                          subitem={subitem}
                                          setOpen={setOpen}
                                          key={subitem.title + index}
                                        />
                                      )
                                    case 'sub-menu':
                                      return (
                                        <SubMenu
                                          subMenu={subitem}
                                          setOpen={setOpen}
                                          key={subitem.title + index}
                                        />
                                      )
                                  }
                                })}
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

export default MobileNav
