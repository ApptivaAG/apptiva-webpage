'use client'

import { cn } from '@/utils/cn'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { navbarData } from './Navbar'
import apptivaLogo from './logo.svg'
import navBurger from './nav-burger.svg'
import Button from './ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
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
          className="w-10 md:hidden"
        />
      </SheetTrigger>

      <SheetContent side="top" className="pr-0">
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
        <div className="mb-10 mt-[3.25rem] text-base-white">
          <div className="flex flex-col">
            {navbarData.map((item) => (
              <div key={item.href}>
                <div className="flex flex-col pb-5 pt-4 focus:outline-none">
                  {item.items ? (
                    <Collapsible>
                      <CollapsibleTrigger className="group flex w-full justify-between text-[1.25rem] leading-[1.25rem] data-[state=open]:text-secondary">
                        {item.title}
                        <ChevronDown
                          className="relative top-[1px] ml-1 size-5 transition duration-200 group-data-[state=open]:rotate-180"
                          aria-hidden="true"
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="flex flex-col gap-3 data-[state=open]:my-8">
                        {item.items.map((subitem) => (
                          <MobileLink
                            href={subitem.href}
                            onOpenChange={setOpen}
                            className="flex gap-5 rounded-md py-1 align-middle"
                            key={subitem.href}
                          >
                            <Image
                              src={subitem.icon}
                              alt={subitem.title}
                              className="w-24"
                            />
                            <div className="flex flex-col justify-center">
                              <span className="leading-6">{subitem.title}</span>
                              <small>{subitem.text}</small>
                            </div>
                          </MobileLink>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <MobileLink
                      href={item.href}
                      onOpenChange={setOpen}
                      className="text-[1.25rem] leading-[1.25rem]"
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
        <Link href={'/kontakt/'}>
          <Button
            element="div"
            intent="secondary"
            className="text-center text-primary"
          >
            Kontakt
          </Button>
        </Link>
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
