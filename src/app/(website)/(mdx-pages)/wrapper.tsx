import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'

export default function Wrapper(props: {
  children: React.ReactNode
  meta: Partial<Metadata>
}) {
  return (
    <>
      <PageHeader
        title={props.meta.title?.toString() ?? 'Ohne Titel'}
        lead={props.meta.description ?? 'Ohne Beschreibung'}
      />
      <div className="prose py-8">{props.children}</div>
    </>
  )
}
