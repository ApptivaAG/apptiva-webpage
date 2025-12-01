'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import icon from './promo-button-icon.svg'

const PromoButton = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location.pathname.includes('weihnachtsaktion')
    ) {
      setShow(false)
    } else {
      setShow(true)
    }
  })

  if (!show) {
    return null
  }

  return (
    <Link
      href="/angebot/chatbots/weihnachtsaktion"
      className="absolute bottom-4 right-4 z-50 animate-[bounce_1s_ease-in-out_3.5] md:bottom-16 md:right-16"
    >
      <Image
        priority
        src={icon}
        alt="Close Menu"
        className="w-36 md:w-48 lg:w-64"
      />
    </Link>
  )
}

export default PromoButton
