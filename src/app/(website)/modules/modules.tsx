import Module from '@/components/module'
import { HomepageDataQueries } from '@/sanity/lib/queries'

export default function ModuleWrapper(props: {
  data: HomepageDataQueries
  customers: React.ReactNode
  testimonials: React.ReactNode
}) {
  return (
    <>
      {props.data.modules?.map((module) => (
        <Module
          key={module._key}
          module={module}
          customers={props.customers}
          testimonials={props.testimonials}
        />
      ))}
    </>
  )
}
