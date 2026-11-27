'use client'

import { usePathname } from 'next/navigation'
import Button from './ui/button'

export default function BackToTopButton() {
  const pathname = usePathname()

  if (pathname !== '/') {
    return null
  }

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'instant' : 'smooth',
    })
  }

  return (
    <div className="col-span-full flex justify-center">
      <Button type="button" intent="secondary" onClick={scrollToTop}>
        Zurück nach oben
      </Button>
    </div>
  )
}
