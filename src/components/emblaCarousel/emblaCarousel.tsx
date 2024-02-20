'use client'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import ProjectOverview from '../project-overview'
import Testimonial from '../testimonial'
import Button from '../ui/button'
import carouselNavigationLeftIcon from './../../../public/icons/arrow-left-circle.svg'
import carouselNavigationRightIcon from './../../../public/icons/arrow-right-circle.svg'
const TWEEN_FACTOR = 2.5
const SIZE_FACTOR = 1
const MIN_SIZE = 600

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

type PropType = {
  slides: []
  options?: EmblaOptionsType
  navigationButtonFullWidth: boolean
  bgDark: boolean
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, navigationButtonFullWidth, bgDark } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [mousePos, setMousePos] = useState({ x: String, y: String })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isPrevButtonHovered, setIsPrevButtonHovered] = useState(false)
  const [isNextButtonHovered, setIsNextButtonHovered] = useState(false)
  const [tweenValues, setTweenValues] = useState<number[]>([])
  const [sizeValue, setSizeValue] = useState<number[]>([])

  const onScroll = useCallback((emblaApi: any) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)

    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()

    const styles = emblaApi
      .scrollSnapList()
      .map((scrollSnap: any, index: number) => {
        let diffToTarget = scrollSnap - scrollProgress
        console.log('loop', engine.options.loop)

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem: any) => {
            const target = loopItem.target()
            if (index === loopItem.index && target !== 0) {
              const sign = Math.sign(target)
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
            }
          })
        }
        const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR)
        const sizeValue = (1 - Math.abs(diffToTarget * SIZE_FACTOR)) * MIN_SIZE
        const styles = {
          tweenValue: numberWithinRange(tweenValue, 0, 1),
          sizeValue: numberWithinRange(sizeValue, 200, MIN_SIZE),
        }
        return styles
      })
    console.log('tweenValues', styles)

    setTweenValues(styles.map((style: any) => style.tweenValue))
    setSizeValue(styles.map((style: any) => style.sizeValue))
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
  const carouselNavigationButton = navigationButtonFullWidth
    ? 'w-6/12'
    : 'w-[20%]'

  const progressBarLine = bgDark ? 'bg-base-white' : 'bg-primary'
  return (
    <>
      <div className="full relative">
        <div className="overflow-hidden">
          <div ref={emblaRef}>
            <div className="flex">
              {!navigationButtonFullWidth &&
                slides.map((slide: any, index) => {
                  return (
                    <div
                      className={`relative my-20 h-[--min-size-mobile] flex-[0_0_100%] lg:h-[--min-size] lg:flex-[0_0_60%] lg:pl-[1rem]`}
                      key={index}
                      style={
                        {
                          ...(tweenValues.length && {
                            opacity: tweenValues[index],
                          }),
                          '--min-size': `${MIN_SIZE}px`,
                          '--min-size-mobile': `${MIN_SIZE / 3}px`,
                        } as React.CSSProperties
                      }
                    >
                      <div
                        style={
                          {
                            ...(tweenValues.length && {
                              '--project-overview-height': `${sizeValue[index]}px`,
                              '--project-overview-height-mobile': `${sizeValue[index] / 3}px`,
                            }),
                          } as React.CSSProperties
                        }
                        className="absolute top-1/2 h-[--project-overview-height-mobile] -translate-y-1/2 rounded-lg border border-base-grey p-5 lg:h-[--project-overview-height]"
                      >
                        <ProjectOverview project={slide}></ProjectOverview>
                      </div>
                    </div>
                  )
                })}
              {navigationButtonFullWidth &&
                slides.map((slide: any) => {
                  return (
                    <div
                      key={slide.id}
                      className="my-20 min-w-0 flex-[0_0_100%]"
                    >
                      <Testimonial testimonial={slide}></Testimonial>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
        <Button
          onClick={scrollPrev}
          onMouseMove={handleMouseMove}
          onMouseEnter={handlePrevButtonHover}
          onMouseLeave={handlePrevButtonLeave}
          className={`absolute left-0 top-0 z-50 hidden h-full bg-transparent hover:bg-transparent lg:block ${carouselNavigationButton}`}
        >
          {' '}
        </Button>
        {!navigationButtonFullWidth && <div className="w-[60%]"> </div>}
        <Button
          onClick={scrollNext}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleNextButtonHover}
          onMouseLeave={handleNextButtonLeave}
          className={`absolute right-0 top-0 z-50 hidden h-full bg-transparent hover:bg-transparent lg:block ${carouselNavigationButton}`}
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
          <div
            className={`absolute bottom-10 left-0 right-0 top-1/2 z-10 h-[1px] w-full -translate-y-1/2 overflow-hidden rounded ${progressBarLine}`}
          ></div>
        </div>
      </div>
    </>
  )
}

export default EmblaCarousel
