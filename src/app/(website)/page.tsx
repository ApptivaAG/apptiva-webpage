import Hero from '@/app/(website)/_root/hero'
import Projects from '@/app/(website)/_root/projects'
import Customers from '@/components/customers'
import Testimonials from '@/components/testimonials'
import ServiceTeasers from './_root/service-teaser'

export default async function Home() {
  return (
    <>
      <Hero />
      <ServiceTeasers />
      <Projects />
      <Testimonials />
      <Customers />
    </>
  )
}
