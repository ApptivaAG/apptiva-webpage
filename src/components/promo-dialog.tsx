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
    const currentHost =
      (typeof window !== 'undefined' && window.location.host) || undefined

    // Check if referrer is empty (direct access) or from external site
    const isExternal =
      !referrer || (!!currentHost && !referrer.includes(currentHost))

    setIsOpen(isExternal)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="border-secondary bg-primary text-base-white">
        <DialogHeader className="hidden">
          <DialogTitle />
        </DialogHeader>

        <Image priority src={popup} alt="Close Menu" className="border-none" />

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
