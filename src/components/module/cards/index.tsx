import { ModuleData } from '@/sanity/lib/queries'
import CardFlow from './card-flow'
import CardListExpandable from './card-list-expandable'

export default function Cards(props: { module: ModuleData }) {
  const { module } = props

  switch (module.layout) {
    case 'card-flow':
      return <CardFlow module={module} />

    case 'card-list-expandable':
      return <CardListExpandable module={module} />

    default:
      return <div>Layout wählen</div>
  }
}
