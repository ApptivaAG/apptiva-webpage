'use client'

import { cn } from '@/utils/cn'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { navbarData } from './Navbar'
import apptivaLogo from './logo.svg'
import navBurger from './nav-burger.svg'
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
          <div className="flex flex-col space-y-2">
            {navbarData.map((item) => (
              <div key={item.href}>
                <div className="flex flex-col space-y-3 py-4">
                  <MobileLink
                    href={item.href}
                    onOpenChange={setOpen}
                    className="text-[1.25rem] leading-[1.25rem]"
                  >
                    {item.title}
                  </MobileLink>
                  {item?.items?.length &&
                    item.items.map((subitem) => (
                      <MobileLink
                        href={subitem.href}
                        onOpenChange={setOpen}
                        className="text-muted-foreground"
                        key={subitem.href}
                      >
                        {subitem.title}
                      </MobileLink>
                    ))}
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
