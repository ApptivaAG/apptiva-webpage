import { PortableText as PortableTextType } from '@/domain/types'
import { cn } from '@/utils/cn'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Link from 'next/link'
import Heading from './heading'
import { leadStyle } from './page-header'
import SanityImage from './sanity-image'
import Button from './ui/button'
import Underline from './ui/underline'
import UnderlineForLink from './ui/underline-for-link'

const StyledPortableText = ({
  content,
  individualComponents,
  spreadParagraphs = false,
  isHero = false,
  className = '',
}: {
  content: PortableTextType
  individualComponents?: PortableTextComponents
  spreadParagraphs?: boolean
  isHero?: boolean
  className?: string
}) => {
  if (!content) {
    return null
  }
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
    list: {
      bullet: ({ children }) => (
        <ul className={cn('mt-xl space-y-5 pl-4', className)}>{children}</ul>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className={cn('list-arrow pl-8 marker:text-xl', className)}>
          {children}
        </li>
      ),
    },
    block: {
      h1: ({ children }) => <Heading level={1}>{children}</Heading>,
      h2: ({ children }) => <Heading level={2}>{children}</Heading>,
      h3: ({ children }) => <Heading level={3}>{children}</Heading>,
      h4: ({ children }) => <Heading level={4}>{children}</Heading>,
      normal: ({ children }) => (
        <div
          className={cn(
            'whitespace-break-spaces py-1',
            className,
            spreadParagraphs ? 'py-4' : '',
            isHero ? leadStyle : ''
          )}
        >
          {children}
        </div>
      ),
    },
    hardBreak: () => (
      <>
        <br />
        <span className="block h-1" />
      </>
    ),
    ...individualComponents,
  }

  return <PortableText value={content} components={components} />
}

export default StyledPortableText
