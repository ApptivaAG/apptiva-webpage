import Heading from '@/components/heading'
import Module from '@/components/module'
import SanityImage from '@/components/sanity-image'
import { ServiceBySlugQueryData } from '../types'

export default function ServiceDetail(props: {
  service: ServiceBySlugQueryData
  customers: React.ReactNode
}) {
  return (
    <>
      <header className="full mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pt-44 text-base-white">
        <div className="content ">
          <Heading level={1}>{props.service.header?.title}</Heading>
          <p className="mt-6">{props.service.header?.lead}</p>
          <div className="flex justify-center pb-4 pt-16">
            {props.service.header?.image && (
              <SanityImage image={props.service.header?.image} />
            )}
          </div>
        </div>
      </header>

      {props.service.modules?.map((module) => (
        <Module key={module._key} module={module} customers={props.customers} />
      ))}
    </>
  )
}
