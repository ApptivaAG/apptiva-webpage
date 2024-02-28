import { ModuleData } from '@/sanity/lib/queries'
import Cards from './cards'
import ProjectModule from './project-module'
import FAQs from './faqs'
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

    case 'prices':
      console.log('module with prices? ', module)
      // return (
      //   <>
      //     {module.prices?.map((price) => (
      //       <p key={price.title}>{price.title}</p>
      //     ))}
      //   </>
      // )
      return <div>preise go here</div>

    case 'contact':
      return <Contact module={module} />

    default:
      return <div>Modultyp wählen</div>
  }
}
