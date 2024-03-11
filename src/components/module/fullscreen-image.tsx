import { ModuleData } from '@/sanity/lib/queries'
import SanityImage from '../sanity-image'
import { PortableText } from '@portabletext/react'

export default function FullscreenImage(props: { module: ModuleData }) {
  return (
    <div className="full relative flex items-end">
      {/* fill: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, 
      rgba(0, 0, 0, 0.40) 100%), url(<path-to-image>), lightgray 50% / cover no-repeat;
       */}

      <SanityImage
        className=" object-cover"
        image={props.module.fullscreenImage}
      />
      {props.module.fullscreenImageText && (
        <div className="content absolute bg-transparent pb-11  text-base-white">
          <PortableText value={props.module.fullscreenImageText} />
        </div>
      )}
    </div>
  )
}
