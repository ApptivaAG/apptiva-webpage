'use client'

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import Image from 'next/image'
import * as React from 'react'

import Button from '@/components/ui/button'
import { cn } from '@/utils/cn'
import carouselNavigationLeftIcon from './../../../public/icons/arrow-left-circle.svg'
import carouselNavigationRightIcon from './../../../public/icons/arrow-right-circle.svg'

const TWEEN_FACTOR = 1.5
const SIZE_FACTOR = 1
const MIN_SIZE = 600

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]
type CarouselLayout =
  | 'oneSlide'
  | 'threeSlidesFadeOut'
  | 'threeSlides'
  | 'fiveSlides'

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  layout: CarouselLayout
  scrollPrev: () => void
  scrollNext: () => void
  handlePrevButtonHover: () => void
  handlePrevButtonLeave: () => void
  handleNextButtonHover: () => void
  handleNextButtonLeave: () => void
  isPrevButtonHovered: boolean
  isNextButtonHovered: boolean
  handleMouseMove: (event: any) => void
  mousePos: { x: string; y: string }
  transitionValues: number[]
  sizeValue: number[]
  progressBarSize: number
  scrollProgress: number
  newTotalWidth: number
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    CarouselProps & { layout: CarouselLayout; numberOfSlides: number }
>(
  (
    {
      opts,
      setApi,
      plugins,
      className,
      children,
      layout,
      numberOfSlides: slides,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
      },
      plugins
    )

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }
      onSelect(api)
      api.on('reInit', onSelect)
      api.on('select', onSelect)

      return () => {
        api?.off('select', onSelect)
      }
    }, [api, onSelect])

    const [mousePos, setMousePos] = React.useState({ x: String, y: String })
    const [isPrevButtonHovered, setIsPrevButtonHovered] = React.useState(false)
    const [isNextButtonHovered, setIsNextButtonHovered] = React.useState(false)

    const handlePrevButtonHover = React.useCallback(() => {
      setIsPrevButtonHovered(true)
    }, [])

    const handlePrevButtonLeave = React.useCallback(() => {
      setIsPrevButtonHovered(false)
    }, [])
    const handleNextButtonHover = React.useCallback(() => {
      setIsNextButtonHovered(true)
    }, [])

    const handleNextButtonLeave = React.useCallback(() => {
      setIsNextButtonHovered(false)
    }, [])

    const handleMouseMove = React.useCallback(
      (event: any) => {
        setMousePos({ x: event.clientX, y: event.clientY })
      },
      [setMousePos]
    )

    const [transitioinValues, setTransitioinValues] = React.useState<number[]>(
      []
    )
    const [sizeValue, setSizeValue] = React.useState<number[]>([])
    const [scrollProgress, setScrollProgress] = React.useState(0)
    // const [emblaRef, emblaApi] = useEmblaCarousel()

    const onScroll = React.useCallback((emblaApi: any) => {
      const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
      setScrollProgress(progress * 100)

      const engine = emblaApi.internalEngine()
      const scrollProgress = emblaApi.scrollProgress()

      const styles = emblaApi
        .scrollSnapList()
        .map((scrollSnap: any, index: number) => {
          let diffToTarget = scrollSnap - scrollProgress

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem: any) => {
              const target = loopItem.target()
              if (index === loopItem.index && target !== 0) {
                const sign = Math.sign(target)
                if (sign === -1)
                  diffToTarget = scrollSnap - (1 + scrollProgress)
                if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            })
          }
          const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR)
          const sizeValue =
            (1 - Math.abs(diffToTarget * SIZE_FACTOR)) * MIN_SIZE
          const styles = {
            tweenValue: numberWithinRange(tweenValue, 0, 1),
            sizeValue: numberWithinRange(sizeValue, 200, MIN_SIZE),
          }
          return styles
        })

      setTransitioinValues(styles.map((style: any) => style.tweenValue))
      setSizeValue(styles.map((style: any) => style.sizeValue))
    }, [])

    React.useEffect(() => {
      if (!api) return
      onScroll(api)
      api.on('reInit', onScroll)
      api.on('scroll', onScroll)
    }, [api, onScroll])

    const progressBarSize = 100 / slides
    const newTotalWidth = 100 - progressBarSize

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          layout,
          scrollPrev,
          scrollNext,
          handlePrevButtonHover,
          handlePrevButtonLeave,
          handleNextButtonHover,
          handleNextButtonLeave,
          isPrevButtonHovered,
          isNextButtonHovered,
          handleMouseMove,
          mousePos,
          transitionValues: transitioinValues,
          sizeValue,
          progressBarSize,
          scrollProgress,
          newTotalWidth,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = 'Carousel'

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const {
    carouselRef,
    layout,
    scrollPrev,
    scrollNext,
    handlePrevButtonHover,
    handlePrevButtonLeave,
    handleNextButtonHover,
    handleNextButtonLeave,
    isPrevButtonHovered,
    isNextButtonHovered,
    handleMouseMove,
    mousePos,
    sizeValue,
    progressBarSize,
    scrollProgress,
    newTotalWidth,
  } = useCarousel()
  let carouselNavigationButton
  switch (layout) {
    case 'oneSlide':
      carouselNavigationButton = 'w-6/12'
      break
    case 'threeSlidesFadeOut':
      carouselNavigationButton = 'w-[20%]'
      break
    default:
      break
  }

  return (
    <>
      <div ref={carouselRef} className="overflow-hidden">
        <div ref={ref} className={cn('flex', className)} {...props} />
      </div>{' '}
      <Button
        onClick={scrollPrev}
        onMouseMove={handleMouseMove}
        onMouseEnter={handlePrevButtonHover}
        onMouseLeave={handlePrevButtonLeave}
        className={`absolute left-0 top-0 z-30 hidden h-full w-6/12 bg-transparent hover:bg-transparent lg:block ${carouselNavigationButton}`}
      >
        {' '}
      </Button>
      {layout == 'threeSlidesFadeOut' && <div className="w-[60%]"> </div>}
      <Button
        onClick={scrollNext}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleNextButtonHover}
        onMouseLeave={handleNextButtonLeave}
        className={` absolute right-0 top-0 z-30 hidden h-full w-6/12 bg-transparent hover:bg-transparent lg:block ${carouselNavigationButton}`}
      >
        {' '}
      </Button>
      <div
        className="fixed left-[--mousePosX] top-[--mousePosY] z-20 h-24 w-24 -translate-x-1/2 -translate-y-1/2 bg-transparent opacity-[--iconOpacity] transition-opacity duration-500 ease-in"
        style={
          {
            '--mousePosX': `${mousePos.x}px`,
            '--mousePosY': `${mousePos.y}px`,
            '--iconOpacity': isPrevButtonHovered || isNextButtonHovered ? 1 : 0,
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
          className={`absolute bottom-10 left-0 right-0 top-1/2 z-10 h-[1px] w-full -translate-y-1/2 overflow-hidden rounded bg-primary`} // ${progressBarLine}`}
        ></div>
      </div>
    </>
  )
})
CarouselContent.displayName = 'CarouselContent'

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    index: number
  }
>(({ className, index, ...props }, ref) => {
  const {
    transitionValues: transitioinValues,
    sizeValue,
    layout,
  } = useCarousel()
  if (layout == 'oneSlide') {
    return <OneSlideCarouselItem ref={ref} className={className} {...props} />
  } else if (layout == 'threeSlidesFadeOut') {
    return (
      <ThreeSlidesFadeOutCarouselItem
        index={index}
        ref={ref}
        className={className}
        transitioinValues={transitioinValues}
        sizeValue={sizeValue}
        {...props}
      ></ThreeSlidesFadeOutCarouselItem>
    )
  }
})
CarouselItem.displayName = 'CarouselItem'

const OneSlideCarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn('min-w-0 shrink-0 grow-0 basis-full', className)}
      {...props}
    />
  )
})

const ThreeSlidesFadeOutCarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    index: number
    transitioinValues: number[]
    sizeValue: number[]
  }
>(({ className, index, transitioinValues, sizeValue, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      // className={`relative my-20 h-[--min-size-mobile] flex-[0_0_100%] md:flex-[0_0_60%] lg:h-[--min-size] lg:pl-[1rem]`}
      key={index}
      className={cn(
        'relative my-20 flex h-[--min-size-mobile] min-w-0 flex-[0_0_100%] shrink-0 grow-0 basis-full md:flex-[0_0_60%] lg:h-[--min-size] lg:pl-[1rem]',
        className
      )}
      style={
        {
          ...(transitioinValues.length && {
            opacity: transitioinValues[index],
          }),
          '--min-size': `${MIN_SIZE}px`,
          '--min-size-mobile': `${MIN_SIZE / 2}px`,
        } as React.CSSProperties
      }
    >
      <div
        style={
          {
            ...(transitioinValues.length && {
              '--project-overview-height': `${sizeValue[index]}px`,
              '--project-overview-height-mobile': `${sizeValue[index] / 2}px`,
            }),
          } as React.CSSProperties
        }
        className="absolute top-1/2 h-[--project-overview-height-mobile] -translate-y-1/2 rounded-lg border border-base-grey p-5 lg:h-[--project-overview-height]"
        {...props}
      ></div>
    </div>
  )
})

export { Carousel, CarouselContent, CarouselItem, type CarouselApi }
