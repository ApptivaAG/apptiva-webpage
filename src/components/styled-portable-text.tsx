import { PortableText as PortableTextType } from '@/utils/types'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Heading from './heading'

const StyledPortableText = ({
  content,
  spreadParagraphs = false,
}: {
  content: PortableTextType
  spreadParagraphs?: boolean
}) => {
  const components: PortableTextComponents = {
    marks: {
      // Ex. 1: custom renderer for the em / italics decorator
      underline: ({ children }) => (
        <span className="highlighted-text">{children}</span>
      ),
      strong: ({ children }) => (
        <span className="highlighted-text">{children}</span>
      ),
    },
    block: {
      h1: ({ children }) => <Heading level={1}>{children}</Heading>,
      h2: ({ children }) => <Heading level={2}>{children}</Heading>,
      h3: ({ children }) => <Heading level={3}>{children}</Heading>,
      h4: ({ children }) => <Heading level={4}>{children}</Heading>,
      ...(spreadParagraphs && {
        normal: ({ children }) => <p className="py-4">{children}</p>,
      }),
    },
  }

  return <PortableText value={content} components={components} />
}

export default StyledPortableText
