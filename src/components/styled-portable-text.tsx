import { cn } from '@/utils/cn'
import { PortableText as PortableTextType } from '@/utils/types'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Heading from './heading'
import UnderlineForLink from './ui/underline-for-link'

const StyledPortableText = ({
  content,
  spreadParagraphs = false,
  className = '',
}: {
  content: PortableTextType
  spreadParagraphs?: boolean
  className?: string
}) => {
  const components: PortableTextComponents = {
    marks: {
      // Ex. 1: custom renderer for the em / italics decorator
      underline: ({ children }) => (
        <span className={cn('highlighted-text', className)}>{children}</span>
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
    list: {
      bullet: ({ children }) => (
        <ul className={cn('mt-xl space-y-5 pl-4', className)}>{children}</ul>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className={cn('list-arrow pl-8 marker:text-lg', className)}>
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
        <p
          className={cn(
            'whitespace-break-spaces ',
            className,
            spreadParagraphs ? 'py-4' : ''
          )}
        >
          {children}
        </p>
      ),
    },
    hardBreak: () => (
      <>
        <br />
        <span className="block h-1" />
      </>
    ),
  }

  return <PortableText value={content} components={components} />
}

export default StyledPortableText
