'use client'
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import React from 'react'

export default function Carousel(props: { children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      speed: 2,
      startDelay: 0,
      stopOnInteraction: false,
      stopOnFocusIn: false,
    }),
  ])

  return (
    <div ref={emblaRef} className="full overflow-hidden">
      {props.children}
    </div>
  )
}
