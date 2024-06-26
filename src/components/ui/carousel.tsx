'use client'

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import Image from 'next/image'
import * as React from 'react'

import { cn } from '@/utils/cn'
import carouselNavigationLeftIcon from './../../../public/icons/arrow-left-circle.svg'
import carouselNavigationRightIcon from './../../../public/icons/arrow-right-circle.svg'
import Button from './button'

const TWEEN_FACTOR = 1.5
const SIZE_FACTOR = 1
const MIN_SIZE = 600

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]
type CarouselLayout = 'autoWidth' | 'fadeOut'

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  layout: CarouselLayout
  darkTheme: boolean
  scrollPrev: () => void
  scrollNext: () => void
  transitionValues: number[]
  sizeValue: number[]
  progressBarSize: number
  scrollProgress: number
  newTotalWidth: number
  progressBarLine: string
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
    CarouselProps & {
      layout?: CarouselLayout
      darkTheme?: boolean
      numberOfSlides: number
      loop?: boolean
      align?: 'center' | 'start' | 'end'
    }
>(
  (
    {
      opts,
      setApi,
      plugins,
      className,
      children,
      layout = 'autoWidth',
      darkTheme = false,
      numberOfSlides: slides,
      loop = false,
      align = 'center',
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        loop: loop,
        align,
        containScroll: 'keepSnaps',
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

    const [transitioinValues, setTransitioinValues] = React.useState<number[]>(
      []
    )
    const [sizeValue, setSizeValue] = React.useState<number[]>([])
    const [scrollProgress, setScrollProgress] = React.useState(0)

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
    const progressBarLine = darkTheme ? 'bg-base-white' : 'bg-primary'

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          layout,
          darkTheme,
          scrollPrev,
          scrollNext,
          transitionValues: transitioinValues,
          sizeValue,
          progressBarSize,
          scrollProgress,
          newTotalWidth,
          progressBarLine,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative pb-16 pt-8', className)}
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
  const { carouselRef } = useCarousel()

  return (
    <div className="group relative">
      <div ref={carouselRef} className="content overflow-clip">
        <div ref={ref} className={cn('flex gap-4', className)} {...props} />
      </div>
      <ProgressBar />
      <NavigationButtons />
    </div>
  )
})
CarouselContent.displayName = 'CarouselContent'

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    index: number
  }
>(({ className, index, ...props }, ref) => {
  const { layout } = useCarousel()

  if (layout === 'fadeOut') {
    return (
      <SlidesFadeOutCarouselItem
        index={index}
        ref={ref}
        className={className}
        {...props}
      />
    )
  }
  return <SlideCarouselItem ref={ref} className={className} {...props} />
})
CarouselItem.displayName = 'CarouselItem'

const SlideCarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-auto max-lg:max-w-[78vw]',
        className
      )}
      {...props}
    />
  )
})
SlideCarouselItem.displayName = 'SlideCarouselItem'

const SlidesFadeOutCarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    index: number
  }
>(({ className, index, ...props }, ref) => {
  const { transitionValues: transitioinValues, sizeValue } = useCarousel()
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      key={index}
      className={cn(
        'relative flex h-[--min-size-mobile] min-w-0 shrink-0 grow-0 basis-full md:h-[--min-size-tablet] md:pl-[1rem] lg:h-[--min-size]',
        className
      )}
      style={
        {
          ...(transitioinValues.length && {
            opacity: transitioinValues[index],
          }),
          '--min-size': `${MIN_SIZE}px`,
          '--min-size-tablet': `${MIN_SIZE / 1.5}px`,
          '--min-size-mobile': `${MIN_SIZE / 2}px`,
        } as React.CSSProperties
      }
    >
      <div
        style={
          {
            ...(transitioinValues.length && {
              '--project-overview-height': `${sizeValue[index]}px`,
              '--project-overview-height-tablet': `${sizeValue[index] / 1.5}px`,
              '--project-overview-height-mobile': `${sizeValue[index] / 2}px`,
            }),
          } as React.CSSProperties
        }
        className="absolute top-1/2 h-[--project-overview-height-mobile] -translate-y-1/2 rounded-lg border border-base-grey p-5 md:h-[--project-overview-height-tablet] lg:h-[--project-overview-height]"
        {...props}
      ></div>
    </div>
  )
})
SlidesFadeOutCarouselItem.displayName = 'SlidesFadeOutCarouselItem'

function NavigationButtons() {
  const { scrollPrev, scrollNext } = useCarousel()
  return (
    <div className="pointer-events-none absolute inset-0 hidden h-full overflow-clip lg:block">
      <div className="content h-full items-center justify-items-center *:pointer-events-auto *:size-24 *:overflow-clip *:rounded-full *:p-0">
        <Button
          onClick={scrollPrev}
          className="col-[full-start] bg-transparent opacity-0 transition-opacity hover:bg-transparent hover:!opacity-95 group-hover:opacity-60"
        >
          <Image src={carouselNavigationLeftIcon} alt="Links" />{' '}
        </Button>
        <Button
          onClick={scrollNext}
          className="col-[feature-end] bg-transparent opacity-0 transition-opacity hover:bg-transparent hover:!opacity-95 group-hover:opacity-60"
        >
          <Image src={carouselNavigationRightIcon} alt="Rechts" />
        </Button>
      </div>
    </div>
  )
}

function ProgressBar() {
  const { progressBarSize, scrollProgress, newTotalWidth, progressBarLine } =
    useCarousel()
  return (
    <div className="content mt-8 h-2 items-center overflow-hidden rounded bg-transparent">
      <div
        className={`col-[content] row-[1/1] h-[1px] w-full overflow-hidden rounded ${progressBarLine}`}
      />
      <div className="relative col-[content] row-[1/1] h-1">
        <div
          className="absolute left-[--leftScrollOffset] h-full w-[--progressBarSize] rounded bg-secondary"
          style={
            {
              '--progressBarSize': `${progressBarSize}%`,
              '--leftScrollOffset': `${(scrollProgress / 100) * newTotalWidth}%`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  )
}

export { Carousel, CarouselContent, CarouselItem, type CarouselApi }
