'use client'

import { client } from '@/sanity/lib/client'
import { useLiveMode } from '@sanity/react-loader'
import { VisualEditing } from 'next-sanity'
import React from 'react'

import { useEffect } from 'react'

// Always enable stega in Live Mode
const stegaClient = client.withConfig({ stega: true })

export default function LiveVisualEditing() {
  /**
   * this hook listens to incoming changes and reports them back to any useQuery hooks
   */
  useLiveMode({ client: stegaClient })

  /**
   * enables and disables enableOverlays:
   * they look through the DOM for any stega encoded strings and turn them into
   * interactive links inside Presentation
   */
  useEffect(() => {
    // If not an iframe or a Vercel Preview deployment, turn off Draft Mode
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview' && window === parent) {
      location.href = '/api/disable-draft'
    }
  }, [])

  /**
   * this component from next-sanity communicates navigation changes from next.js
   * to the presentation tool
   */
  return <VisualEditing />
}
