import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

const clientWithToken = client.withConfig({ token })

/**
 * This route (/api/draft) is visited by the presentation tool in sanity studio
 */

export async function GET(request: Request) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    clientWithToken,
    request.url
  )

  // todo: reenable this as its a good idea i guess?
  //   if (!isValid) {
  //     return new Response('Invalid secret', { status: 401 })
  //   }

  draftMode().enable()

  redirect(redirectTo)
}
