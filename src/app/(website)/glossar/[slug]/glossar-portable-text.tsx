import SanityImage from '@/components/sanity-image'
import Underline from '@/components/ui/underline'
import UnderlineForLink from '@/components/ui/underline-for-link'
import { PortableText as PortableTextType } from '@/utils/types'
import { PortableText, PortableTextComponents } from '@portabletext/react'

export default function GlossaryPortableText({
  content,
  className = '',
}: {
  content: PortableTextType
  className?: string
}) {
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
    },
    marks: {
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
