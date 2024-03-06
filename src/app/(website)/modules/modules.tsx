import Module from '@/components/module'
import { SettingsData } from '../_root/hero/types'

export default function ModuleWrapper(props: {
  data: SettingsData
  customers: React.ReactNode
}) {
  console.log('modules at modulewrapper ', props.data?.modules)

  return (
    <>
      {props.data.modules?.map((module) => (
        <Module key={module._key} module={module} customers={props.customers} />
      ))}
    </>
  )
}
