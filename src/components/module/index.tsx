import { ModuleData } from '@/sanity/lib/queries'
import Cards from './cards'
import ProjectModule from './project-module'
import FAQs from './faqs'
import Prices from './prices'
import Text from './text'
import Contact from './contact'

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
      return <ProjectModule module={module} />

    case 'faqs':
      return <FAQs module={module} />

    case 'text':
      return <Text module={module} />

    case 'contact':
      return <Contact module={module} />

    case 'prices':
      return <Prices module={module} />

    default:
      return <div>Modultyp wählen</div>
  }
}
