import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import StyledPortableText from '@/components/styled-portable-text'
import { ServicePageTeasersData } from '@/sanity/lib/queries'

const ServiceTeaser = ({
  service,
  rowNumber,
}: {
  service: ServicePageTeasersData
  rowNumber: number
}) => {
  const leftCard = 'lg:col-[full-start/left-end] lg:rounded-l-md'
  const rightCard = 'lg:col-[right-start/full-end] lg:rounded-r-md'
  const leftContent = 'pr-12 lg:col-left lg:pr-20'
  const rightContent = 'pl-12 lg:col-right lg:pl-20'

  return (
    <div className="content middle-grid">
      <div
        className={
          (rowNumber % 2 ? rightCard : leftCard) +
          ' col-[full] row-start-1 bg-base-grey max-lg:rounded-t-md'
        }
      />
      <div
        className={
          (rowNumber % 2 ? rightContent : leftContent) +
          ' col-[full] row-start-1 flex flex-col justify-center py-12 align-middle text-primary max-lg:p-12'
        }
      >
        <Heading level={2} size={3} className="pb-4 lg:pb-6">
          {service.teaserTitle}
        </Heading>
        {service.teaser &&
          service.teaser.map((content: any) => (
            <StyledPortableText key={content._key} content={content} />
          ))}
      </div>
      <div
        className={
          (rowNumber % 2 ? leftCard : rightCard) +
          ' col-[full] flex items-center justify-center bg-primary p-12 max-lg:rounded-b-md lg:p-20'
        }
      >
        {service.illustration && (
          <SanityImage
            image={service.illustration}
            className="max-size-[27rem] aspect-square object-contain object-center"
          />
        )}
      </div>
    </div>
  )
}

export default ServiceTeaser
