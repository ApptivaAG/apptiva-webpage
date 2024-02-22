import { getTestimonialsData } from '@/utils/testimonials'
import EmblaCarouselTestimonialView from './emblaCarousel/emblaCarouselTestimonialView'

const Testimonials = () => {
  const testimonials = getTestimonialsData()

  return (
    <div className="full ">
      <EmblaCarouselTestimonialView
        slides={testimonials}
      ></EmblaCarouselTestimonialView>
    </div>
  )
}

export default Testimonials
