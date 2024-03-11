import { ModuleData } from '@/sanity/lib/queries'
import SanityImage from '../sanity-image'

export default function FullscreenImage(props: { module: ModuleData }) {
  return (
    <div className="full">
      {/* fill: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, 
      rgba(0, 0, 0, 0.40) 100%), url(<path-to-image>), lightgray 50% / cover no-repeat;
       */}

      <SanityImage className="" image={props.module.fullscreenImage} />
    </div>
  )
}
