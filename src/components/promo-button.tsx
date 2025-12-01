'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import icon from './promo-button.svg'

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
      className="absolute bottom-4 right-4 z-50 md:bottom-16 md:right-16"
      style={{
        animation: 'bounce 1s ease-in-out 3.5',
      }}
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
