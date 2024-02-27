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
      <Carousel
        opts={{ loop: true }}
        layout={'oneSlide'}
        numberOfSlides={testimonials.length}
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => {
            return (
              <CarouselItem index={index}>
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
