import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import { SanityImageWithAlt } from '@/utils/types'
import BreadCrumb from './bread-crumb'

export function PageHeader(props: {
  title: string | undefined
  lead: string | undefined
  links?: { name: string; href?: string | undefined }[]
  image?: SanityImageWithAlt
  callToAction?: React.ReactNode
}) {
  return (
    <header className="full mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pb-8 pt-32 text-base-white md:pb-16 md:pt-44">
      <div className="content">
        {props.links && (
          <BreadCrumb className="pb-2 md:pb-6" links={props.links} />
        )}
        <Heading level={1}>
          <span
            dangerouslySetInnerHTML={{
              __html: props.title ?? '',
            }}
          />
        </Heading>
        <p className="max-w-xl pt-4 text-xl md:pt-8">{props.lead}</p>
        {props.callToAction && (
          <div className="pt-8 md:pt-12">{props.callToAction}</div>
        )}
        {props.image && (
          <div className="flex justify-center pb-4 pt-16">
            <SanityImage image={props.image} />
          </div>
        )}
      </div>
    </header>
  )
}
