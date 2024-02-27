import { getTestimonialsData } from '@/utils/testimonials'
import Testimonial from './testimonial'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

const Testimonials = () => {
  const testimonials = getTestimonialsData()

  return (
    // <div className="full ">
    //   <EmblaCarouselTestimonialView
    //     slides={testimonials}
    //   ></EmblaCarouselTestimonialView>
    // </div>
    <div className="full">
      <Carousel>
        <CarouselContent>
          {testimonials.map((testimonial) => {
            return (
              <CarouselItem>
                <Testimonial testimonial={testimonial}></Testimonial>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Testimonials
