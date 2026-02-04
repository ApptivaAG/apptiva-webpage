import { PortableText as PortableTextType } from '@/domain/types'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Link from 'next/link'
import SanityImage from './sanity-image'
import Button from './ui/button'
import Underline from './ui/underline'
import UnderlineForLink from './ui/underline-for-link'

const ProjectPortableText = ({
  content,
  className = '',
}: {
  content: PortableTextType
  className?: string
}) => {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        return <SanityImage image={value} />
      },
      cta: (props: {
        value: {
          name: string
          href: string
          _type: 'link'
          _key: string
        }
      }) => {
        return (
          <div className="py-4 md:py-8">
            <Link href={props.value?.href}>
              <Button intent="secondary">{props.value?.name}</Button>
            </Link>
          </div>
        )
      },
    },
    marks: {
      // Ex. 1: custom renderer for the em / italics decorator
      underline: ({ children }) => (
        <Underline className={className}>{children}</Underline>
      ),
      link: ({ value, children }) => {
        const href = value?.href
        if (!href) return children
        const target = href.startsWith('http') ? '_blank' : undefined
        if (target)
          return (
            <a href={href} target={target} rel="noindex nofollow">
              <UnderlineForLink>{children}</UnderlineForLink>
            </a>
          )
        return (
          <Link href={href}>
            <UnderlineForLink>{children}</UnderlineForLink>
          </Link>
        )
      },
    },
  }

  return <PortableText value={content} components={components} />
}

export default ProjectPortableText
