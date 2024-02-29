import Heading from '@/components/heading'
import { AboutPageQueryData } from './types'
import SanityImage from '@/components/sanity-image'
import Module from '@/components/module'

export default function About(props: {
  data: AboutPageQueryData
  customers: React.ReactNode
}) {
  return (
    <>
      <header className="full mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pt-44 text-base-white">
        <div className="content ">
          <div className="feature">
            <Heading level={1}>{props.data.header?.title}</Heading>
            <p className="mt-6">{props.data.header?.lead}</p>
            <div className="flex justify-center pb-4 pt-16">
              {props.data.header?.image && (
                <SanityImage image={props.data.header?.image} />
              )}
            </div>
          </div>
        </div>
      </header>

      {props.data.modules?.map((module) => (
        <Module key={module._key} module={module} customers={props.customers} />
      ))}
    </>
  )
}
