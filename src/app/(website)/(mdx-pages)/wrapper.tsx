import { PageHeader } from '@/components/page-header'

export default function Wrapper(props: {
  children: React.ReactNode
  meta: MdxMeta
}) {
  return (
    <>
      <PageHeader title={props.meta.title} lead={props.meta.description} />
      <div className="prose py-8">{props.children}</div>
    </>
  )
}

export type MdxMeta = {
  title: string
  description: string
}
