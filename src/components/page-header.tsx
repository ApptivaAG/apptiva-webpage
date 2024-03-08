import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import { SanityImageWithAlt } from '@/utils/types'

export function PageHeader(props: {
  title: string | undefined
  lead: string | undefined
  image?: SanityImageWithAlt
}) {
  return (
    <header className="full mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pt-44 text-base-white">
      <div className="content">
        <Heading level={1}>{props.title}</Heading>
        <p className="mt-6">{props.lead}</p>
        <div className="flex justify-center pb-4 pt-16">
          {props.image && <SanityImage image={props.image} />}
        </div>
      </div>
    </header>
  )
}
