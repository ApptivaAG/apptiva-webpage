'use client'
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

const Customers = ({
  customers,
}: {
  customers: {
    id: string
    path: string
    fileName: String
    alt: string
    height: number
  }[]
}) => {
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
      <div className="flex h-[16.4rem] items-center gap-4">
        {customers.map((customer: any) => {
          return (
            <div
              key={customer.id}
              className="relative min-w-0 flex-[0_0_16.4rem]"
              style={{ height: customer.height + 10 }}
            >
              <Image
                alt={customer.alt}
                src={customer.path}
                fill
                className="object-contain"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Customers
