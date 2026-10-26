import Module from '@/components/module'
import type { HomepageDataQueries, ModuleData } from '@/sanity/lib/queries'

export default function ModuleWrapper(props: {
  data: HomepageDataQueries
  customers: React.ReactNode
  testimonials: React.ReactNode
  partners: React.ReactNode
  isDraftMode?: boolean
}) {
  return (
    <>
      {props.data.modules?.map((module: ModuleData) => (
        <Module
          key={module._key}
          module={module}
          customers={props.customers}
          testimonials={props.testimonials}
          partners={props.partners}
          isDraftMode={props.isDraftMode}
        />
      ))}
    </>
  )
}
