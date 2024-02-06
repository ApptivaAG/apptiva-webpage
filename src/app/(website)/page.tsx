// ./nextjs-app/app/page.tsx
import Hero from '@/components/hero'
import Testimonials from '@/components/testimonials'
import { getTestimonialsData } from '../../utils/testimonials'

export default async function Home() {
  const testimonials = getTestimonialsData()

  return (
    <>
      <Hero />
      <Testimonials testimonials={testimonials} />
    </>
  )
}
