import Projects from '@/app/(website)/_root/projects'
import Customers from '@/components/customers'
import Hero from '@/components/hero'
import Testimonials from '@/components/testimonials'
import getCustomerLogos from '@/utils/customers'
import { getSettings } from '@/utils/settings'
import { getTestimonialsData } from '../../utils/testimonials'
import ServiceTeasers from './_root/service-teaser'

export default async function Home() {
  const testimonials = getTestimonialsData()
  const customers = getCustomerLogos()
  const claim = (await getSettings())?.claim

  return (
    <>
      <Hero claim={claim} />
      <ServiceTeasers />
      <Projects />
      <Testimonials testimonials={testimonials} />
      <Customers customers={customers} />
    </>
  )
}
