'use client'
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

const Customers = ({
  customers,
}: {
  customers: { id: string; path: string }[]
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ speed: 2, startDelay: 0 }),
  ])

  return (
    <div ref={emblaRef} className="full overflow-hidden">
      <div className="flex h-[16.4rem] items-center gap-2">
        {customers.map((customer: any) => {
          return (
            <div
              key={customer.id}
              className="relative my-20 h-10 min-w-0 flex-[0_0_16.4rem]"
            >
              <Image
                alt={customer.id}
                src={customer.path}
                fill
                className="object-contain"
                sizes="16.4rem"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Customers
