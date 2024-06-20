import { getTestimonialsData } from '@/domain/testimonials'
import Testimonial from './testimonial'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

const Testimonials = async () => {
  const testimonials = await getTestimonialsData()

  return (
    <div className="full">
      <Carousel
        loop={false}
        layout={'autoWidth'}
        numberOfSlides={testimonials.length}
        className="py-14 md:py-16"
      >
        <CarouselContent className="gap-96">
          {testimonials.map((testimonial, index) => {
            return (
              <CarouselItem key={index} index={index} className="basis-full">
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
