'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'
import Button from './button'
import Testimonial from './testimonial'

const Testimonials = ({ testimonials }: { testimonials: any }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    console.log('emblaAPi', emblaApi)

    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="full relative">
      <div className="overflow-hidden">
        <div ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial: any) => {
              return (
                <div
                  key={testimonial.id}
                  className="m- mb-20 mt-20 min-w-0 flex-[0_0_100%]"
                >
                  <Testimonial testimonial={testimonial}></Testimonial>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Button
        onClick={scrollPrev}
        className="bg-transparent absolute left-0 top-0 h-full w-6/12"
      >
        {' '}
      </Button>
      <Button
        onClick={scrollNext}
        className="bg-transparent absolute right-0 top-0 h-full w-6/12"
      >
        {' '}
      </Button>
    </div>
  )
}

export default Testimonials
