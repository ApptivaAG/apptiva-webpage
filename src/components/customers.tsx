import Image from 'next/image'
import { Group, getCustomerLogos } from '@/domain/customers'
import { urlForImage } from '@/sanity/lib/image'
import Carousel from './carousel'

export default async function Customers(props: { groups?: Group[] }) {
  const customers = await getCustomerLogos(props.groups)

  return (
    <Carousel>
      <div className="flex h-[16.4rem] items-center">
        {customers.map((customer) => {
          return customer.logo?.asset ? (
            <div
              key={customer._id}
              className="relative mr-4 min-w-0 flex-[0_0_16.4rem] bg-base-white md:mr-16"
              style={{ height: customer.logoHeight ?? 40 }}
            >
              <Image
                alt={customer.customerName}
                src={urlForImage(customer.logo).url()}
                fill
                className="object-contain opacity-80"
              />
              <div className="absolute inset-[1px] bg-primary bg-blend-lighten mix-blend-color [filter:brightness(120%)]"></div>
            </div>
          ) : null
        })}
      </div>
    </Carousel>
  )
}
