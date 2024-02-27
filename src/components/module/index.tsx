import { ModuleData } from '@/sanity/lib/queries'
import Cards from './cards'
import ProjectModule from './project-module'

export default function Module(props: {
  module: ModuleData
  customers: React.ReactNode
}) {
  const { module } = props

  switch (module.type) {
    case 'cards':
      return <Cards module={module} />

    case 'testimonials-customers':
      return props.customers

    case 'projects':
      console.log('module ', module)
      return <ProjectModule module={module} />

    default:
      return <div>Modultyp wählen</div>
  }
}
