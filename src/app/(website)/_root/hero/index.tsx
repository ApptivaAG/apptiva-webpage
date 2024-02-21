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

  const { claim } = published.at(0) ?? { claim: undefined }
  return (
    <div className="full animate-gradient from-primary-light bg-300% mt-[-8rem] min-h-fit items-center bg-gradient-to-br to-primary-dark py-44 text-base-white">
      {claim && isEnabled ? (
        <Content claim={claim} />
      ) : (
        <HeroPreview initial={draft} />
      )}
    </div>
  )
}
