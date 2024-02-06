'use client'
import EmblaCarousel from './EmblaCarousel/EmblaCarousel'
import Testimonial from './testimonial'

const Testimonials = ({ testimonials }: { testimonials: any }) => {
  // const [emblaRef, emblaApi] = useEmblaCarousel()

  // const scrollPrev = useCallback(() => {
  //   if (emblaApi) emblaApi.scrollPrev()
  // }, [emblaApi])

  // const scrollNext = useCallback(() => {
  //   console.log('emblaAPi', emblaApi)

  //   if (emblaApi) emblaApi.scrollNext()
  // }, [emblaApi])

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
    // <div className="full relative">
    //   <div className="overflow-hidden">
    //     <div ref={emblaRef}>
    //       <div className="flex">
    //         {testimonials.map((testimonial: any) => {
    //           return (
    //             <div
    //               key={testimonial.id}
    //               className="mb-20 mt-20 min-w-0 flex-[0_0_100%]"
    //             >
    //               <Testimonial testimonial={testimonial}></Testimonial>
    //             </div>
    //           )
    //         })}
    //       </div>
    //     </div>
    //   </div>
    //   <Button
    //     onClick={scrollPrev}
    //     className="testimonial-button-prev bg-transparent absolute left-0 top-0 h-full w-6/12"
    //   >
    //     {' '}
    //   </Button>
    //   <Button
    //     onClick={scrollNext}
    //     className="testimonial-button-next bg-transparent absolute right-0 top-0 h-full w-6/12"
    //   >
    //     {' '}
    //   </Button>
    // </div>
  )
}

export default Testimonials
