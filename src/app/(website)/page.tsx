// ./nextjs-app/app/page.tsx

import { draftMode } from 'next/headers'
import Blogs from './blog/page'

export default async function Home() {
  // const testimonials = getTestimonialsData()
  // const customers = getCustomerLogos()

  return (
    <>
      {/* <Hero /> */}
      {/* <Testimonials testimonials={testimonials} />
      <Customers customers={customers} /> */}
      <p>****draft: {draftMode().isEnabled ? 'yes' : 'nö'}****</p>
      {/* <BlogsForPreview blogs={initialBlog.data}></BlogsForPreview> */}
      <Blogs
        params={{
          slug: '',
        }}
        searchParams={{}}
      ></Blogs>
    </>
  )
}
