import { ModuleData } from '@/sanity/lib/queries'
import TextWithImageOneCol from './one-col'
import TextWithImageTwoCol from './two-col'

export default function TextWithImage(props: { module: ModuleData }) {
  console.log('TextWithImage', props.module.layout)

  switch (props.module.layout) {
    case '1-column':
      return <TextWithImageOneCol {...props} />

    case '2-column':
    default:
      return <TextWithImageTwoCol {...props} />
  }
}
