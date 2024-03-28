import { ModuleData } from '@/sanity/lib/queries'
import Cards from './cards'
import Contact from './contact'
import FAQs from './faqs'
import Image from './image'
import Prices from './prices'
import ProjectModule from './project-module'
import Quote from './quote'
import ServiceTeaserList from './service-teaser/service-teaser-list'
import Team from './team'
import Text from './text'

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

    case 'quote':
      return <Quote module={module} />

    case 'teaser-servicepage':
      return <ServiceTeaserList module={module} />

    case 'image':
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image module={module} />
    case 'team':
      return <Team module={module} />

    default:
      return <div>Modultyp wählen</div>
  }
}
