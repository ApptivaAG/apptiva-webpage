import { ModuleData } from '@/sanity/lib/queries'
import SanityImage from '../sanity-image'
import { PortableText } from '@portabletext/react'
import StyledPortableText from '../styled-portable-text'

export default function FullscreenImage(props: { module: ModuleData }) {
  return (
    <div className="full relative flex items-end">
      <SanityImage
        className=" object-cover"
        image={props.module.fullscreenImage}
      />
      {props.module.fullscreenImageText && (
        <div className="content absolute bg-transparent text-base-white *:col-[feature-start/content-end] lg:pb-36  ">
          <div className="md:pb-[5%] xl:w-2/3 xl:pb-[10%]">
            <StyledPortableText
              content={props.module.fullscreenImageText}
              spreadParagraphs
            />
          </div>
        </div>
      )}
    </div>
  )
}
