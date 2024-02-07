'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { ReactNode, useCallback } from 'react'
import Button from '../button'

type PropType = {
  slides: any
  children: ReactNode
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, children } = props
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
          <div className="flex">{children}</div>
        </div>
      </div>
      <Button
        onClick={scrollPrev}
        className="testimonial-button-prev bg-transparent absolute left-0 top-0 h-full w-6/12"
      >
        {' '}
      </Button>
      <Button
        onClick={scrollNext}
        className="testimonial-button-next bg-transparent absolute right-0 top-0 h-full w-6/12"
      >
        {' '}
      </Button>
    </div>
  )
}

export default EmblaCarousel
