import { getTestimonialsData } from '@/utils/testimonials'
import Testimonial from './testimonial'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

const Testimonials = async () => {
  const testimonials = await getTestimonialsData()

  return (
    <div className="full">
      <Carousel
        loop={true}
        layout={'oneSlide'}
        numberOfSlides={testimonials.length}
        className="py-14 md:py-16"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => {
            return (
              <CarouselItem key={index} index={index}>
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
