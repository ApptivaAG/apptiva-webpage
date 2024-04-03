import { PortableText as PortableTextType } from '@/utils/types'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { Code } from 'bright'
import Underline from './ui/underline'
import UnderlineForLink from './ui/underline-for-link'

export default function BlogPortableText({
  content,
  className = '',
}: {
  content: PortableTextType
  className?: string
}) {
  const components: PortableTextComponents = {
    types: {
      code: (props: {
        value: { _key: string; code: string; _type: 'code'; language: string }
      }) => {
        console.log('props', props)

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
