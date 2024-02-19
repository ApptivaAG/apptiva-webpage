'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import Button from '../ui/button'
import carouselNavigationLeftIcon from './../../../public/icons/arrow-left-circle.svg'
import carouselNavigationRightIcon from './../../../public/icons/arrow-right-circle.svg'

type PropType = {
  slides: []
  children: ReactNode
  navigationButtonFullWidth: boolean
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, children, navigationButtonFullWidth } = props
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [mousePos, setMousePos] = useState({ x: String, y: String })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isPrevButtonHovered, setIsPrevButtonHovered] = useState(false)
  const [isNextButtonHovered, setIsNextButtonHovered] = useState(false)

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

  const handleMouseMove = useCallback(
    (event: any) => {
      setMousePos({ x: event.clientX, y: event.clientY })
    },
    [setMousePos]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const handlePrevButtonHover = useCallback(() => {
    setIsPrevButtonHovered(true)
  }, [])

  const handlePrevButtonLeave = useCallback(() => {
    setIsPrevButtonHovered(false)
  }, [])
  const handleNextButtonHover = useCallback(() => {
    setIsNextButtonHovered(true)
  }, [])

  const handleNextButtonLeave = useCallback(() => {
    setIsNextButtonHovered(false)
  }, [])

  const progressBarSize = 100 / slides.length
  const newTotalWidth = 100 - progressBarSize
  // TODO: Parameter wie der Bereich geklickt werden soll auf dem Carousel
  // const carouselNavigationButtonFullWidth = false
  const carouselNavigationButton = navigationButtonFullWidth
    ? 'w-6/12'
    : 'w-3/12'
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
          onMouseMove={handleMouseMove}
          onMouseEnter={handlePrevButtonHover}
          onMouseLeave={handlePrevButtonLeave}
          className={`absolute left-0 top-0 z-50 h-full bg-transparent hover:bg-transparent ${carouselNavigationButton}`}
        >
          {' '}
        </Button>
        {!navigationButtonFullWidth && <div className="w-6/12"> </div>}
        <Button
          onClick={scrollNext}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleNextButtonHover}
          onMouseLeave={handleNextButtonLeave}
          className={`absolute right-0 top-0 z-50 h-full bg-transparent hover:bg-transparent ${carouselNavigationButton}`}
        >
          {' '}
        </Button>
        <div
          className="fixed left-[--mousePosX] top-[--mousePosY] z-20 h-24 w-24 -translate-x-1/2 -translate-y-1/2 bg-transparent opacity-[--iconOpacity] transition-opacity duration-500 ease-in"
          style={
            {
              '--mousePosX': `${mousePos.x}px`,
              '--mousePosY': `${mousePos.y}px`,
              '--iconOpacity':
                isPrevButtonHovered || isNextButtonHovered ? 1 : 0,
            } as React.CSSProperties
          }
        >
          <Image
            src={
              isPrevButtonHovered
                ? carouselNavigationLeftIcon
                : carouselNavigationRightIcon
            }
            alt="Carousel Navigations Icon"
          />
        </div>
        <div className=" absolute bottom-8 left-0 right-0 z-10 mx-auto h-1 w-4/5 max-w-full overflow-hidden rounded bg-transparent">
          <div
            className="absolute bottom-0 left-[--leftScrollOffset] top-0 z-20 w-[--progressBarSize] rounded bg-secondary"
            style={
              {
                '--progressBarSize': `${progressBarSize}%`,
                '--leftScrollOffset': `${(scrollProgress / 100) * newTotalWidth}%`,
              } as React.CSSProperties
            }
          ></div>
          <div className="absolute bottom-10 left-0 right-0 top-1/2 z-10 h-[1px] w-full -translate-y-1/2 overflow-hidden rounded bg-primary-dark"></div>
        </div>
      </div>
    </>
  )
}

export default EmblaCarousel
