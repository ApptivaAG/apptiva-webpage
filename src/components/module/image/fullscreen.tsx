import { ModuleData } from '@/sanity/lib/queries'
import SanityImage from '../../sanity-image'
import StyledPortableText from '../../styled-portable-text'
import Heading from '@/components/heading'

export default function FullscreenImage(props: { module: ModuleData }) {
  return (
    <div className="full grid items-end">
      <SanityImage
        className="col-start-1 row-start-1 h-full w-full object-cover"
        image={props.module.image}
        size="full"
      />
      {props.module.content && (
        <>
          <div className="col-start-1 row-start-1 h-full w-full bg-gradient-to-tr from-primary to-50%"></div>
          <div className="content col-start-1 row-start-1 !pt-[100%] pb-8 text-base-white *:col-[feature-start/content-end] md:!pt-[50%] md:pb-24">
            {props.module.title && (
              <Heading level={2} size={3} className="pb-4">
                {props.module.title}
              </Heading>
            )}
            <div className="md:max-w-xl">
              <StyledPortableText
                content={props.module.content}
                spreadParagraphs
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
