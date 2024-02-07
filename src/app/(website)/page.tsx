// ./nextjs-app/app/page.tsx
import Customers from '@/components/customers'
import Hero from '@/components/hero'
import Testimonials from '@/components/testimonials'
import { getCustomerLogos } from '@/utils/customers'
import { getTestimonialsData } from '../../../lib/testimonials'

export default async function Home() {
  const testimonials = getTestimonialsData()
  const customers = getCustomerLogos()

  return (
    <>
      <Hero />
      <Testimonials testimonials={testimonials} />
      <Customers customers={customers} />
    </>
  )
}
