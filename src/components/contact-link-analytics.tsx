'use client'

import { usePlausible } from 'next-plausible'
import { useEffect } from 'react'

function stripPrefix(href: string, prefix: string) {
  const value = href.slice(prefix.length).split('?')[0]
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export default function ContactLinkAnalytics() {
  const plausible = usePlausible()

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) return
      const link = target.closest('a[href]')
      if (!link) return
      const href = link.getAttribute('href')?.trim() ?? ''
      const lower = href.toLowerCase()
      const url = window.location.pathname

      if (lower.startsWith('mailto:')) {
        // __PRINT_LOC_START
        console.log('┆ContactLinkAnalytics#(anon)#onClick#mail┆ ┊1┊') // __PRINT_LOC_END
        plausible('E-Mail-Klick', {
          props: { email: stripPrefix(href, 'mailto:'), url },
        })
      } else if (lower.startsWith('tel:')) {
        // __PRINT_LOC_START
        console.log('┆ContactLinkAnalytics#(anon)#onClick#tel┆ ┊1┊') // __PRINT_LOC_END
        plausible('Telefon-Klick', {
          props: { phone: stripPrefix(href, 'tel:'), url },
        })
      }
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [plausible])

  return null
}
