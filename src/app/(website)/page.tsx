// ./nextjs-app/app/page.tsx
import Hero from '@/components/hero'
import Testimonials from '@/components/testimonials'
import { getTestimonialsData } from '../../utils/testimonials'
import Customers from '@/components/customers'
import getCustomerLogos from '@/utils/customers'
import BlogsForPreview from '@/components/BLOGS'
import { loadQuery } from '@/sanity/lib/store'
import { SanityDocument } from 'next-sanity'
import { BLOGS_QUERY } from '@/sanity/lib/queries'

export default async function Home() {
  // const testimonials = getTestimonialsData()
  // const customers = getCustomerLogos()
  const initialBlog = await loadQuery<SanityDocument[]>(BLOGS_QUERY)
  console.log(initialBlog.data)

  return (
    <>
      <Hero />
      {/* <Testimonials testimonials={testimonials} />
      <Customers customers={customers} /> */}
      <BlogsForPreview blogs={initialBlog.data}></BlogsForPreview>
    </>
  )
}
