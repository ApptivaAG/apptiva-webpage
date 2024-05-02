import { PortableText as PortableTextType } from '@/utils/types'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import SanityImage from './sanity-image'

const ProjectPortableText = ({
  content,
}: {
  content: PortableTextType
  className?: string
}) => {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        return <SanityImage image={value} />
      },
    },
  }

  return <PortableText value={content} components={components} />
}

export default ProjectPortableText
