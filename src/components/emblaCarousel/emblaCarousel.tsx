'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import Button from '../button'

type PropType = {
  slides: []
  children: ReactNode
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, children } = props
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [scrollProgress, setScrollProgress] = useState(0)

  const onScroll = useCallback((emblaApi: any) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onScroll(emblaApi)
    emblaApi.on('reInit', onScroll)
    emblaApi.on('scroll', onScroll)
  }, [emblaApi, onScroll])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const progressBarSize = 100 / slides.length
  const newTotalWidth = 100 - progressBarSize

  return (
    <>
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
          className="testimonial-button-prev testimonial-button-next bg-transparent absolute right-0 top-0 h-full w-6/12"
        >
          {' '}
        </Button>
        <div className="bg-transparent pointer-events-none absolute bottom-8 left-0 right-0 z-10 mx-auto h-1 w-4/5 max-w-full overflow-hidden rounded">
          <div
            className="absolute bottom-0 left-[--leftScrollOffset] top-0 z-20 w-[--progressBarSize] rounded bg-secondary"
            style={{
              '--progressBarSize': `${progressBarSize}%`,
              '--leftScrollOffset': `${(scrollProgress / 100) * newTotalWidth}%`,
            }}
          ></div>
          <div className="pointer-events-none absolute bottom-10 left-0 right-0 top-1/2 z-10 h-[1px] w-full -translate-y-1/2 overflow-hidden rounded bg-primary-dark"></div>
        </div>
      </div>
    </>
  )
}

export default EmblaCarousel
