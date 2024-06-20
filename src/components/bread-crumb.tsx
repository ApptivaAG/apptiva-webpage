import { cn } from '@/domain/cn'
import Link from 'next/link'
import UnderlineForLink from './ui/underline-for-link'
import React from 'react'

export default function BreadCrumb(props: {
  links: { name: string; href?: string | undefined }[]
  className?: string
}) {
  const links = [{ name: 'Home', href: '/' }, ...props.links]
  return (
    <nav className={cn('flex', props.className)} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-baseline gap-x-2">
        {links.map((link, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <li>
                <Chevron />
              </li>
            )}
            <li>
              {link.href && index + 1 !== links.length ? (
                <Link href={link.href} className={'opacity-40'}>
                  <UnderlineForLink>
                    <span dangerouslySetInnerHTML={{ __html: link.name }} />
                  </UnderlineForLink>
                </Link>
              ) : (
                <p
                  className={cn(index + 1 !== links.length && 'opacity-40')}
                  dangerouslySetInnerHTML={{ __html: link.name }}
                />
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}

const Chevron = () => (
  <svg
    width="12"
    height="11"
    viewBox="6 5 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.4">
      <path
        d="M10 16L14 12L10 8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)
