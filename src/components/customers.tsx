import getCustomerLogos from '@/utils/customers'
import Image from 'next/image'
import Carousel from './carousel'

const Customers = () => {
  const customers = getCustomerLogos()

  return (
    <Carousel>
      <div className="flex h-[16.4rem] items-center">
        {customers.map((customer: any) => {
          return (
            <div
              key={customer.id}
              className="relative mr-4 min-w-0 flex-[0_0_16.4rem] bg-base-white md:mr-16"
              style={{ height: customer.height + 10 }}
            >
              <Image
                alt={customer.alt}
                src={customer.path}
                fill
                className="object-contain opacity-80"
              />
              <div className="absolute inset-[1px] bg-primary bg-blend-lighten mix-blend-color [filter:brightness(120%)]"></div>
            </div>
          )
        })}
      </div>
    </Carousel>
  )
}

export default Customers
