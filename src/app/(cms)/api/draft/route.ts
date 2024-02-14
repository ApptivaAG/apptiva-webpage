import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { validatePreviewUrl } from '@sanity/preview-url-secret'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/env'

/**
 * This route (/api/draft) is visited by the presentation tool in sanity studio
 */

export async function GET(request: Request) {
  const clientWithToken = client.withConfig({
    token: token,
  })

  // const { isValid, redirectTo = '/' } = await validatePreviewUrl(

  const validate = await validatePreviewUrl(clientWithToken, request.url)

  console.log('************** validatePreviewUrl **************', validate)

  // todo: reenable this as its a good idea i guess?
  //   if (!isValid) {
  //     return new Response('Invalid secret', { status: 401 })
  //   }

  draftMode().enable()

  redirect('/')
}
