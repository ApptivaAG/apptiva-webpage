import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import StyledPortableText from '@/components/styled-portable-text'
import { ServicePageTeasersData } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'

const ServiceTeaser = ({
  service,
  rowNumber,
}: {
  service: ServicePageTeasersData
  rowNumber: number
}) => {
  const leftCard = 'lg:[grid-column:full-start/middle] lg:rounded-l-md'
  const rightCard = 'lg:[grid-column:middle/full-end] lg:rounded-r-md'
  const leftContent = 'lg:[grid-column:content-start/middle] lg:pr-20'
  const rightContent = 'lg:[grid-column:middle/content-end] lg:pl-20'

  return (
    <div className="content middle-grid">
      <div
        className={
          (rowNumber % 2 ? rightCard : leftCard) +
          ' row-start-1 bg-base-grey [grid-column:full] max-lg:rounded-t-md'
        }
      />
      <div
        className={
          (rowNumber % 2 ? rightContent : leftContent) +
          ' row-start-1 flex flex-col justify-center align-middle text-primary [grid-column:full] max-lg:p-12'
        }
      >
        <Heading level={2} size={3} className="pb-4 lg:pb-6">
          {service.teaserTitle}
        </Heading>
        {service.teaser?.map((content: any) => (
          <StyledPortableText key={content._key} content={content} />
        ))}
      </div>
      <div
        className={
          (rowNumber % 2 ? leftCard : rightCard) +
          ' flex items-center justify-center bg-primary p-12 [grid-column:full] max-lg:rounded-b-md lg:p-20'
        }
      >
        <SanityImage
          image={service.illustration}
          className="max-size-[27rem] object-cover object-center"
        />
      </div>
    </div>
  )
}

export default ServiceTeaser
