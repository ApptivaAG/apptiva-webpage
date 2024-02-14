'use client'
import EmblaCarouselTestimonialView from './emblaCarousel/emblaCarouselTestimonialView'

const Testimonials = ({ testimonials }: { testimonials: any }) => {
  return (
    <div className="full">
      <EmblaCarouselTestimonialView
        slides={testimonials}
      ></EmblaCarouselTestimonialView>
    </div>
  )
}

export default Testimonials
