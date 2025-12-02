'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Button from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import popup from './weihnachtsaktion.svg'

const PromoDialog = () => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const referrer = document.referrer
    const location = typeof window !== 'undefined' ? window.location : undefined
    const currentHost = location?.host
    const path = location?.pathname

    // Check if referrer is empty (direct access) or from external site
    const isExternal =
      !referrer || (!!currentHost && !referrer.includes(currentHost))
    const isPromoPage = location?.pathname.includes('weihnachtsaktion')

    setIsOpen(isExternal && !isPromoPage)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="bg-primary text-base-white outline outline-1 outline-secondary"
        aria-describedby={undefined}
      >
        <DialogHeader className="hidden">
          <DialogTitle />
        </DialogHeader>

        <Image priority src={popup} alt="Close Menu" className="w-full" />

        <DialogFooter>
          <DialogClose asChild>
            <Button
              element="a"
              intent="secondary"
              href="/angebot/chatbots/weihnachtsaktion"
              className="text-center"
            >
              Jetzt Weihnachtsangebot sichern
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PromoDialog
