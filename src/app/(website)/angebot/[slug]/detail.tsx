import Module from '@/components/module'
import { PageHeader } from '@/components/page-header'
import { ServiceBySlugQueryData } from '../types'

export default function ServiceDetail(props: {
  service: ServiceBySlugQueryData
  customers: React.ReactNode
}) {
  return (
    <>
      <PageHeader
        title={props.service.header?.title}
        lead={props.service.header?.lead}
        image={props.service.header?.image}
      />

      {props.service.modules?.map((module) => (
        <Module key={module._key} module={module} customers={props.customers} />
      ))}
    </>
  )
}
