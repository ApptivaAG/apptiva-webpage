import { ModuleData } from '@/sanity/lib/queries'
import ServiceTeaser from './service-teaser-item'

export default function ServiceTeaserList(props: { module: ModuleData }) {
  return (
    <div className="feature space-y-4 py-4 lg:p-4 lg:[&>*:nth-child(even)]:flex-row-reverse ">
      {props.module.serviceTeaser?.map((service: any, index: number) => (
        <ServiceTeaser key={index} service={service} rowNumber={index} />
      ))}
    </div>
  )
}
