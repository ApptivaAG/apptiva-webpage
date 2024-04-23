import { ModuleData } from '@/sanity/lib/queries'
import ServiceTeaser from './service-teaser-item'

export default function ServiceTeaserList(props: { module: ModuleData }) {
  return (
    <div className="feature grid gap-y-4 py-8">
      {props.module.servicePageTeaser?.map((service: any, index: number) => (
        <ServiceTeaser key={index} service={service} rowNumber={index} />
      ))}
    </div>
  )
}
