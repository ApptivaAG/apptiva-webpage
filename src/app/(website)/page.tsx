import Hero from '@/app/(website)/_root/hero'
import Projects from '@/app/(website)/_root/projects'

import Customers from '@/components/customers'
import Testimonials from '@/components/testimonials'
import ServiceTeasers from './_root/service-teaser'
import Module from '@/components/module'
import Modules from './modules/page'

export default async function Home() {
  return (
    <>
      <Hero />
      <Modules />
      {/* <ServiceTeasers />
      <Projects />
      <Testimonials />      
      <Customers />
      */}
    </>
  )
}
