import { ModuleData } from '@/sanity/lib/queries'
import CardFlow from './card-flow'
import CardListExpandable from './card-list-expandable'

export default function Module(props: {
  module: ModuleData
  customers: React.ReactNode
}) {
  const { module } = props

  switch (module.layout) {
    case 'card-flow':
      return <CardFlow module={module} />

    case 'card-list-expandable':
      return <CardListExpandable module={module} />

    case 'testimonials-customers':
      return props.customers

    default:
      return <div>Layout wählen</div>
  }
}
