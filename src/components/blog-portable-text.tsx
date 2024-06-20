import { PortableText as PortableTextType } from '@/domain/types'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import SanityImage from './sanity-image'
import Underline from './ui/underline'
import UnderlineForLink from './ui/underline-for-link'

export default function BlogPortableText(props: {
  content: PortableTextType
  className?: string
  Code: React.ComponentType<{ lang?: string; children: React.ReactNode }>
}) {
  const { content, className, Code } = props
  const components: PortableTextComponents = {
    types: {
      imageWithAlt: (props: {
        value: {
          asset: { _ref: string; _type: 'reference' }
          _type: 'imageWithAlt'
          alt: string
          _key: string
        }
      }) => {
        return <SanityImage image={props.value} size="content" />
      },
      code: (props: {
        value: { _key: string; code: string; _type: 'code'; language: string }
      }) => {
        return <Code lang={props.value.language}>{props.value.code}</Code>
      },
    },
    marks: {
      // Ex. 1: custom renderer for the em / italics decorator
      underline: ({ children }) => (
        <Underline className={className}>{children}</Underline>
      ),
      link: ({ value, children }) => {
        const target = (value?.href || '').startsWith('http')
          ? '_blank'
          : undefined
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === '_blank' ? 'noindex nofollow' : undefined}
          >
            <UnderlineForLink>{children}</UnderlineForLink>
          </a>
        )
      },
    },
  }

  return <PortableText value={content} components={components} />
}
