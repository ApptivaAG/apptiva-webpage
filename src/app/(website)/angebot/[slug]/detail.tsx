import Module from '@/components/module'
import { PageHeader } from '@/components/page-header'
import { ServiceBySlugQueryData } from '../types'
import { ErrorBoundary } from 'react-error-boundary'
import Button from '@/components/ui/button'
import Heading from '@/components/heading'
export default function ServiceDetail(props: {
  service: ServiceBySlugQueryData
  customers: React.ReactNode
  isPreview?: boolean
}) {
  return (
    <>
      <PageHeader
        title={props.service.header?.title}
        lead={props.service.header?.lead}
        image={props.service.header?.image}
      />

      {props.service.modules?.map((module) => (
        <CatchErrors key={module._key} isPreview={props.isPreview}>
          <Module module={module} customers={props.customers} />
        </CatchErrors>
      ))}
    </>
  )
}

function CatchErrors(props: {
  isPreview?: boolean
  children: React.ReactNode
}) {
  return props.isPreview ? (
    <ErrorBoundary fallbackRender={fallbackRender}>
      {props.children}
    </ErrorBoundary>
  ) : (
    <>{props.children}</>
  )
}

function fallbackRender(props: {
  error: { message: string }
  resetErrorBoundary: () => void
}) {
  return (
    <div role="alert" className="space-y-8 py-8">
      <Heading level={2} size={3}>
        Dieses Modul ist fehlerhaft
      </Heading>
      <Button onClick={props.resetErrorBoundary}>Nochmals versuchen</Button>
      <div>
        <p>Fehlermeldung</p>
        <pre className="opacity-50">{props.error.message}</pre>
      </div>
    </div>
  )
}
