import { ModuleData } from '@/sanity/lib/queries'
import CardCarousel from './card-carousel'
import CardFlow from './card-flow'
import CardList from './card-list'

export default function Cards(props: { module: ModuleData }) {
  const { module } = props

  switch (module.layout) {
    case '1-column':
      return <CardList module={module} />

    case '2-column':
    case '3-column':
      return <CardFlow module={module} />

    case 'card-carousel':
      return <CardCarousel module={module} />

    default:
      return <div>Layout wählen</div>
  }
}
