import { ModuleData } from '@/sanity/lib/queries'
import Text from './text'
import TextWithImage from './text-with-image'
export default function Cards(props: { module: ModuleData }) {
  const { module } = props

  switch (true) {
    case !!module.image:
      return <TextWithImage module={module} />

    default:
      return <Text module={module} />
  }
}
