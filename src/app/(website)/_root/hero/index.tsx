import { settingsQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import Content from './content'
import HeroPreview from './preview'

export default async function Hero() {
  const { isEnabled } = draftMode()
  const { draft, published } = await load(settingsQuery, isEnabled, undefined, [
    'settings',
  ])

  const { claim } = published ?? { claim: undefined }
  return (
    <div className="full mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% py-44 text-base-white">
      {claim && isEnabled ? (
        <Content claim={claim} />
      ) : (
        <HeroPreview initial={draft} />
      )}
    </div>
  )
}
