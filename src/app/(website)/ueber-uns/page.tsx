import { aboutPageQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import About from './about'
import AboutPreview from './preview'
import Testimonials from '@/components/testimonials'
import Customers from '@/components/customers'

export default async function AboutPage() {
  const { isEnabled } = draftMode()
  const { published, draft } = await load(
    aboutPageQuery,
    isEnabled,
    undefined,
    ['about-page']
  )

  const customers = (
    <>
      <Testimonials />
      <Customers />
    </>
  )

  return isEnabled ? (
    <AboutPreview initial={draft} customers={customers} />
  ) : (
    <About data={published} customers={customers} />
  )
}
