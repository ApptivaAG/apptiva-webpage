import getPartnerLogos from '@/domain/partners'
import Image from 'next/image'
import Carousel from './carousel'
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

        {/* Small/medium screens: auto-scrolling carousel */}
        <div className="lg:hidden">
          <Carousel>
            <div className="flex h-[16.4rem] flex-nowrap items-center gap-6 md:gap-32">
              {/* Render partners 3 times to ensure enough content for infinite loop */}
              {[...partners, ...partners, ...partners].map((partner: any, index: number) => {
                const isDuplicate = index >= partners.length
                return (
                  <div
                    key={`${partner.id}-${index}`}
                    className="relative min-w-0 flex-[0_0_16.4rem] bg-base-white"
                    style={{ height: partner.height + 10 }}
                    aria-hidden={isDuplicate}
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

        {/* Large screens: static row (no repetition) */}
        <div className="hidden h-[16.4rem] items-center justify-evenly gap-32 lg:flex">
          {partners.map((partner: any) => {
            return (
              <div
                key={partner.id}
                className="relative min-w-0 flex-[0_0_16.4rem] bg-base-white"
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
      </div>
    </div>
  )
}
