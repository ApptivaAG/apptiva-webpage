// ./nextjs-app/app/page.tsx
import Customers from '@/components/customers'
import Hero from '@/components/hero'
import Projects from '@/components/projects'
import ServiceTeasers from '@/components/service-teasers'
import Testimonials from '@/components/testimonials'
import getCustomerLogos from '@/utils/customers'
import { getProjects } from '@/utils/project'
import { getSettings } from '@/utils/settings'
import { getTestimonialsData } from '../../utils/testimonials'

export default async function Home() {
  const projects = await getProjects()
  const testimonials = getTestimonialsData()
  const customers = getCustomerLogos()
  const claim = (await getSettings())?.claim

  return (
    <>
      <Hero claim={claim} />
      {/* <ServiceTeasers /> */}
      <Projects projects={projects}></Projects>
      <Testimonials testimonials={testimonials} />
      <Customers customers={customers} />
    </>
  )
}
