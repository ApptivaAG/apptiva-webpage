import { PortableTextBlock } from '@/utils/types'
import { PortableText, PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  marks: {
    // Ex. 1: custom renderer for the em / italics decorator
    underline: ({ children }) => (
      <span className="highlighted-text">{children}</span>
    ),
  },
}

const StyledPortableText = ({ content }: { content: PortableTextBlock }) => (
  <PortableText key={content._key} value={content} components={components} />
)

export default StyledPortableText
