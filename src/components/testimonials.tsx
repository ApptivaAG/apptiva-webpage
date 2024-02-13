'use client'
import EmblaCarousel from './EmblaCarousel/emblaCarousel'
import Testimonial from './testimonial'

const Testimonials = ({ testimonials }: { testimonials: any }) => {
  return (
    <div className="full">
      <EmblaCarousel slides={testimonials}>
        {testimonials.map((testimonial: any) => {
          return (
            <div
              key={testimonial.id}
              className="mb-20 mt-20 min-w-0 flex-[0_0_100%]"
            >
              <Testimonial testimonial={testimonial}></Testimonial>
            </div>
          )
        })}
      </EmblaCarousel>
    </div>
  )
}

export default Testimonials
