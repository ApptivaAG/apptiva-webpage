// ./nextjs-app/app/page.tsx
import Customers from '@/components/customers'
import Hero from '@/components/hero'
import Projects from '@/components/projects'
import Testimonials from '@/components/testimonials'
import getCustomerLogos from '@/utils/customers'
import { getProjects } from '@/utils/project'
import { getTestimonialsData } from '../../utils/testimonials'
import { getSettings } from '@/utils/settings'
import ServiceTeasers from '@/components/service-teasers'
import { getServiceTeasers } from '@/utils/service-teasers'

export default async function Home() {
  const projects = await getProjects()
  const testimonials = getTestimonialsData()
  const customers = getCustomerLogos()
  const claim = (await getSettings())?.claim

  return (
    <>
      <Hero claim={claim} />
      <ServiceTeasers />
      <Projects projects={projects}></Projects>
      <Testimonials testimonials={testimonials} />
      <Customers customers={customers} />
    </>
  )
}
