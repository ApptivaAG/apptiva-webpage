import getCustomerLogos, { Group } from '@/domain/customers'
import Image from 'next/image'
import Carousel from './carousel'
import getPartnerLogos from '@/domain/partners'
import Heading from './heading'

export default function Partners(props: {}) {
  const partners = getPartnerLogos()

  return (
    <div className="content">
      <Heading level={2} size={3}>
        Unsere Partner
      </Heading>
      <Carousel>
        <div className="flex h-[16.4rem] items-center">
          {partners.map((partner: any) => {
            return (
              <div
                key={partner.id}
                className="relative mr-4 min-w-0 flex-[0_0_16.4rem] bg-base-white md:mr-16"
                style={{ height: partner.height + 10 }}
              >
                <Image
                  alt={partner.alt}
                  src={partner.path}
                  fill
                  className="object-contain opacity-80"
                />
                <div className="absolute inset-[1px] bg-primary bg-blend-lighten mix-blend-color [filter:brightness(120%)]"></div>
              </div>
            )
          })}
        </div>
      </Carousel>
    </div>
  )
}
