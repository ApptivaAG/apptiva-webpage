// ./nextjs-app/app/page.tsx
import Customers from '@/components/customers'
import Hero from '@/components/hero'
import Projects from '@/components/projects'
import Testimonials from '@/components/testimonials'
import getCustomerLogos from '@/utils/customers'
import { getProjects } from '@/utils/project'
import { getTestimonialsData } from '../../utils/testimonials'

export default async function Home() {
  // const projects = await runQuery(projectsQuery, undefined, ['project'])
  const projects = await getProjects()
  const testimonials = getTestimonialsData()
  const customers = getCustomerLogos()

  return (
    <>
      <Hero />
      <Projects projects={projects}></Projects>
      <Testimonials testimonials={testimonials} />
      <Customers customers={customers} />
    </>
  )
}
