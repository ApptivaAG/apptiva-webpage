import { PortableText } from '@portabletext/react'
import { ProjectBySlugQueryData } from '../types'
import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'

export default function ProjectDetail (props: {
  project: ProjectBySlugQueryData
}) {
  return (
    <>
      <Heading level={2}>{props.project.projectName}</Heading>
      <SanityImage image={props.project.image} />
      <div>{props.project.description}</div>
      <div>{props.project.tasks}</div>
      <div>{props.project.time}</div>
      <div>{props.project.technologies}</div>
      <div>{props.project.customer}</div>
      {props.project.content?.map((content) => (
        <PortableText key={content._key} value={content} />
      ))}
      <div>{props.project.contactPerson}</div>
    </>
  )
}
