import Module from '@/components/module'
import { SettingsDataQueries } from '@/sanity/lib/queries'

export default function ModuleWrapper(props: {
  data: SettingsDataQueries
  customers: React.ReactNode
}) {
  return (
    <>
      {props.data.modules?.map((module) => (
        <Module key={module._key} module={module} customers={props.customers} />
      ))}
    </>
  )
}
