// ./nextjs-app/app/page.tsx
import Hero from '@/components/hero'
import Testimonials from '@/components/testimonials'
import { getTestimonialsData } from '../../utils/testimonials'
import Customers from '@/components/customers'
import getCustomerLogos from '@/utils/customers'

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
