// ./nextjs-app/app/page.tsx
import Hero from '@/components/hero';
import Testimonials from '@/components/testimonials';
import { getTestimonialsData } from '../../../lib/testimonials';

export default async function Home() {
  const testimonials = getTestimonialsData()
  
  return (
    <>
      <Hero />
      <Testimonials testimonials={testimonials} />
    </>
  )
}
