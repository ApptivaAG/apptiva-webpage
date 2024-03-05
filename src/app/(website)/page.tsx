import Hero from '@/app/(website)/_root/hero'
import Projects from '@/app/(website)/_root/projects'
import TextHome from '@/app/(website)/_root/text'
import Customers from '@/components/customers'
import Testimonials from '@/components/testimonials'
import ServiceTeasers from './_root/service-teaser'

export default async function Home() {
  return (
    <>
      <Hero />
      {/* <TextHome /> */}
      <ServiceTeasers />
      <Projects />
      <Testimonials />
      <Customers />
    </>
  )
}
