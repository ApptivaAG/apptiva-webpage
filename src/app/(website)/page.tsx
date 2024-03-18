import Hero from '@/app/(website)/_root/hero'

import ModulesPage from './modules/page'

export default async function Home() {
  return (
    <>
      <Hero />
      <ModulesPage />
      {/* <ServiceTeasers />
      
      <Testimonials />      
      <Customers />
      */}
    </>
  )
}
