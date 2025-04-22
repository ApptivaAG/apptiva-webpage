// ./app/api/draft/route.ts
export const runtime = 'edge' // 👈 Enable Edge runtime!

import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/env'

const clientWithToken = client.withConfig({ token })

export async function GET(request: Request) {
  console.time('[api/draft] validatePreviewUrl (edge)')
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    clientWithToken,
    request.url
  )
  console.timeEnd('[api/draft] validatePreviewUrl (edge)')

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  draftMode().enable()
  redirect(redirectTo)
}
