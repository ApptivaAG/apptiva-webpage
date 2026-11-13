import { isValidElement } from 'react'
import ChatInput from '@/components/chat-input'
import SanityImage from '@/components/sanity-image'
import { PortableText, SanityImageWithAlt } from '@/domain/types'
import BreadCrumb from './bread-crumb'
import styles from './ghost-pill.module.css'
import Heading from './heading'
import StyledPortableText from './styled-portable-text'

export const leadStyle = 'max-w-xl pt-4 text-xl md:pt-8'

export function PageHeader(props: {
  title: React.ReactNode | PortableText | undefined
  lead: React.ReactNode | PortableText | undefined
  links?: { name: string; href?: string | undefined }[]
  trustElements?: string[]
  image?: SanityImageWithAlt
  callToAction?: React.ReactNode
  children?: React.ReactNode
}) {
  const title = isReactNode(props.title) ? (
    props.title
  ) : (
    <StyledPortableText content={props.title} />
  )

  const lead = isReactNode(props.lead) ? (
    props.lead
  ) : (
    <StyledPortableText spreadParagraphs={false} content={props.lead} />
  )

  const isChatbotOffer = props.links?.some((link) => link.name === 'Chatbots')
  const trustElements = isChatbotOffer
    ? (props.trustElements ?? []).filter((element) => element.trim().length > 0)
    : []

  return (
    <>
      <header className="full mt-[-8rem] min-h-fit animate-gradient items-center bg-linear-to-br from-primary-light to-primary-dark bg-300% pb-20 pt-32 text-base-white md:pb-24 md:pt-44">
        <div className="content">
          {props.links && (
            <BreadCrumb className="pb-2 md:pb-6" links={props.links} />
          )}
          <div className="grid-cols-5 gap-4 lg:grid">
            {props.title && (
              <Heading className="col-span-5" level={1}>
                {title}
              </Heading>
            )}
            <div
              className={`${leadStyle} ${trustElements.length > 0 ? 'pb-4' : 'pb-8'} col-span-4 row-start-2`}
            >
              {lead}
            </div>
            {trustElements.length > 0 && (
              <ul className="col-span-5 row-start-3 flex flex-wrap items-center gap-3 pb-8 pt-4">
                {trustElements.map((element, index) => (
                  <li
                    key={`${element}-${index}`}
                    className={`${styles.ghostPill} flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium tracking-wide sm:text-base`}
                  >
                    <svg
                      aria-hidden="true"
                      className={`${styles.checkmark} block h-5 w-5 shrink-0`}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M4.5 12.75l6 6 9-13.5"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{element}</span>
                  </li>
                ))}
              </ul>
            )}
            {props.callToAction ? (
              <div className="col-span-5 flex flex-col gap-4">
                <ChatInput
                  mode="inline-input"
                  origin="page-header"
                  variant="white"
                />
                {props.callToAction}
              </div>
            ) : (
              <ChatInput
                mode="inline-input"
                origin="page-header"
                variant="white"
                className="col-span-5"
              />
            )}
          </div>
          {props.image && typeof props.image === 'object' && (
            <div className="flex justify-center pb-4 pt-16">
              <SanityImage image={props.image} />
            </div>
          )}
        </div>
        {props.children}
      </header>
    </>
  )
}

function isReactNode(value: any): value is React.ReactNode {
  return (
    isValidElement(value) ||
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    typeof value === 'number'
  )
}
