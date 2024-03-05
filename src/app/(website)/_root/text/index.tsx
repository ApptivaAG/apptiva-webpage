import { settingsQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import SettingsText from './settings-text'
import TextPreview from './text-preview'

export default async function TextHome() {
  const { isEnabled } = draftMode()
  const { draft, published } = await load(settingsQuery, isEnabled, undefined, [
    'settings',
  ])

  return (
    <section className="full py-8 text-primary lg:py-28">
      {isEnabled ? (
        <TextPreview initial={draft} />
      ) : (
        <SettingsText text={published.at(0)?.text} />
      )}
    </section>
  )
}
