import Hero from '@/app/(website)/_root/hero'
import Projects from '@/app/(website)/_root/projects'
import Customers from '@/components/customers'
import Testimonials from '@/components/testimonials'
import getCustomerLogos from '@/utils/customers'
import { getTestimonialsData } from '../../utils/testimonials'
import ServiceTeasers from './_root/service-teaser'

export default async function Home() {
  const testimonials = getTestimonialsData()
  const customers = getCustomerLogos()

  return (
    <>
      <Hero />
      <ServiceTeasers />
      <Projects />
      <Testimonials testimonials={testimonials} />
      <Customers customers={customers} />
    </>
  )
}
