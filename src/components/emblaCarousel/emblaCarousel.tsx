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

  const progressStyle: React.CSSProperties = {
    zIndex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    height: '0.3rem',
    borderRadius: '0.2rem',
    left: 0,
    right: 0,
    bottom: '2rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    pointerEvents: 'none',
    width: '80%',
    maxWidth: '100%',
    overflow: 'hidden',
  }

  const progressBar: React.CSSProperties = {
    zIndex: 2,
    position: 'absolute',
    width: `${progressBarSize}%`,
    top: 0,
    bottom: 0,
    left: `${(scrollProgress / 100) * newTotalWidth}%`,
    borderRadius: '0.2rem',
  }

  const progressLine: React.CSSProperties = {
    zIndex: 1,
    backgroundColor: 'black',
    position: 'absolute',
    height: '1px',
    borderRadius: '0.2rem',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    bottom: '2.6rem',
    pointerEvents: 'none',
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
  }

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
          className="testimonial-button-next bg-transparent absolute right-0 top-0 h-full w-6/12"
        >
          {' '}
        </Button>
        <div style={progressStyle}>
          <div className="bg-secondary" style={progressBar}></div>
          <div className="bg-primary-dark" style={progressLine}></div>
        </div>
      </div>
    </>
  )
}

export default EmblaCarousel
