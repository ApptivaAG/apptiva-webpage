'use client'

import { stegaClean } from '@sanity/client/stega'
import { useLiveMode } from '@sanity/react-loader'
import { useRouter } from 'next/navigation'
import { VisualEditing } from 'next-sanity/visual-editing'
import { useEffect } from 'react'
import { client } from '@/sanity/lib/client'

const previewClient = client.withConfig({
  perspective: 'drafts',
  useCdn: false,
  stega: { enabled: true, studioUrl: '/studio' },
})

export function SanityPreview({ websiteOrigin }: { websiteOrigin: string }) {
  useLiveMode({ client: previewClient })
  const router = useRouter()

  useEffect(() => {
    const navigate = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return
      }

      const link = event.target.closest('a[href]')
      if (
        !(link instanceof HTMLAnchorElement) ||
        link.hasAttribute('download') ||
        (link.target && link.target !== '_self')
      ) {
        return
      }

      const url = new URL(
        stegaClean(link.getAttribute('href') ?? ''),
        window.location.href
      )
      if (
        url.origin !== websiteOrigin ||
        url.origin === window.location.origin
      ) {
        return
      }

      // CMS links to the published website must stay inside the preview iframe.
      event.preventDefault()
      router.push(`${url.pathname}${url.search}${url.hash}`)
    }

    document.addEventListener('click', navigate, true)
    return () => document.removeEventListener('click', navigate, true)
  }, [router, websiteOrigin])

  return <VisualEditing />
}
