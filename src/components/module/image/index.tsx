import { ModuleData } from '@/sanity/lib/queries'
import FullscreenImage from './fullscreen'
import Popout from './popout'

export default function Image(props: { module: ModuleData }) {
  switch (props.module.layout) {
    case 'full':
      return <FullscreenImage {...props} />

    case 'popout':
      return <Popout {...props} />
    default:
      return <div>Layout wählen</div>
  }
}
