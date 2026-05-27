import SanityImage from '@/components/sanity-image'
import Image from 'next/image'
import Sticker from './sticker.svg'
import { PortableText, SanityImageWithAlt } from '@/domain/types'
import { isValidElement } from 'react'
import BreadCrumb from './bread-crumb'
import Heading from './heading'
import StyledPortableText from './styled-portable-text'
import ChatInput from '@/components/chat-input'
import StickyOnExit from '@/app/(website)/_root/hero/sticky-on-exit'

export const leadStyle = 'max-w-xl pt-4 text-xl md:pt-8'

export function PageHeader(props: {
  title: React.ReactNode | PortableText | undefined
  lead: React.ReactNode | PortableText | undefined
  links?: { name: string; href?: string | undefined }[]
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
    <StyledPortableText content={props.lead} />
  )

  return (
    <>
      <header className="full -mb-16 mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pb-8 pt-32 text-base-white md:pb-16 md:pt-44">
        <div className="content">
          {props.links && (
            <BreadCrumb className="pb-2 md:pb-6" links={props.links} />
          )}
          {props.title && <Heading level={1}>{title}</Heading>}
          <div className="lg:flex">
            <div className={leadStyle}>{lead}</div>
            {props.links?.some((link) => link.name === 'Chatbots') && (
              <Image
                className="mx-auto w-52 max-lg:hidden lg:rotate-12"
                src={Sticker}
                alt="10 Jahre Apptiva Chatbots"
              />
            )}
          </div>
          {props.callToAction ? (
            <div className="flex items-baseline justify-between gap-8 pt-16">
              <div className="text-3xl">{props.callToAction}</div>
            </div>
          ) : (
            <StickyOnExit fixedChildren={<ChatInput bgBlue />}>
              <ChatInput />
            </StickyOnExit>
          )}
          {props.image && (
            <div className="flex justify-center pb-4 pt-16">
              <SanityImage image={props.image} />
            </div>
          )}
        </div>
        {props.children}
      </header>
      {props.callToAction && (
        <ChatInput
          className="sticky top-[calc(100%-6rem)] z-30 mx-auto -mb-32 mt-32 text-primary"
          bgBlue
          hideChatFAB
        />
      )}
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
