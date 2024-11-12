import getCustomerLogos, { Group } from '@/domain/customers'
import Image from 'next/image'
import Carousel from './carousel'
import getPartnerLogos from '@/domain/partners'
import Heading from './heading'

export default function Partners(props: {}) {
  const partners = getPartnerLogos()

  const WithLink: React.FC<{ link?: string; children: React.ReactNode }> = ({
    link,
    children,
  }) =>
    link ? (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      children
    )

  return (
    <div className="full py-8 lg:py-28">
      <div className="content">
        <Heading level={2} size={3} className="text-primary">
          Unsere Partner
        </Heading>

        <Carousel>
          <div className="content justify-content: space-evenly flex h-[16.4rem] items-center md:justify-evenly">
            {partners.map((partner: any) => {
              return (
                <div
                  key={partner.id}
                  className="relative mx-4 min-w-0 flex-[0_0_16.4rem] bg-base-white md:mx-16"
                  style={{ height: partner.height + 10 }}
                >
                  <WithLink link={partner.link}>
                    <Image
                      alt={partner.alt}
                      src={partner.path}
                      fill
                      className="object-contain opacity-80"
                    />

                    <div className="absolute inset-[1px] bg-primary bg-blend-lighten mix-blend-color [filter:brightness(120%)]"></div>
                  </WithLink>
                </div>
              )
            })}
          </div>
        </Carousel>
      </div>
    </div>
  )
}
