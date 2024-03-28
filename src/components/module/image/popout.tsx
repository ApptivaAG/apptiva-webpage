import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import StyledPortableText from '@/components/styled-portable-text'
import { ModuleData } from '@/sanity/lib/queries'

export default function PopoutImage(props: { module: ModuleData }) {
  return (
    <div className="popout grid items-end overflow-clip rounded-lg">
      <SanityImage
        className="col-start-1 row-start-1 h-full w-full object-cover"
        image={props.module.image}
        size="full"
      />
      {props.module.content && (
        <>
          <div className="col-start-1 row-start-1 h-full w-full bg-gradient-to-tr from-primary to-50%"></div>
          <div className="content col-start-1 row-start-1 !pt-[100%] pb-8 text-base-white *:col-[feature-start/content-end] md:!pt-[50%]">
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
