import { homepageQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import Content from './content'
import HeroPreview from './preview'

export default async function Hero() {
  const { isEnabled } = await draftMode()
  const { draft, published } = await load(homepageQuery, isEnabled, undefined, [
    'homepage',
  ])

  return (
    <div className="full relative mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% py-44 text-base-white">
      {isEnabled ? (
        <HeroPreview initial={draft} />
      ) : (
        <Content claim={published} />
      )}
    </div>
  )
}
