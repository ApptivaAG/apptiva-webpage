import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

const clientWithToken = client.withConfig({
  token:
    'skATv0EneKm0tBS8asocCRBzb0oSHFEPFEnByF1ELaOLwKJdYh77fHROzpFPI3pjiaKFregBIvXvIAFr68e0mC9u6tLzpwhxmcDdFGNaFu2edFlhG4RstsPRlvyRVgIDqpCkoqXODatxyxux7nUYu3GJFaG9S2zjGQYdm9xE2BuaxEaxoPPA',
})

export async function GET(request: Request) {
  // const { isValid, redirectTo = '/' } = await validatePreviewUrl(
  //   clientWithToken,
  //   request.url
  // )

  console.log('before check isValid')
  // if (!isValid) {
  //   console.log('no no no is not valid')
  //   return new Response('Invalid secret', { status: 401 })
  // }

  console.log('draft mode is enabled!')
  draftMode().enable()

  //return new Response('yeah', { status: 200 })
  redirect('/')
}
