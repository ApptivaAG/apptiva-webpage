import { AboutPageQueryData } from './types'
import Module from '@/components/module'
import { PageHeader } from '../../../components/page-header'

export default function About(props: {
  data: AboutPageQueryData
  customers: React.ReactNode
}) {
  return (
    <>
      <PageHeader
        title={props.data.header?.title}
        lead={props.data.header?.lead}
      />

      {props.data.modules?.map((module) => (
        <Module key={module._key} module={module} customers={props.customers} />
      ))}
    </>
  )
}
