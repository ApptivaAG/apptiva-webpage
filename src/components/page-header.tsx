import SanityImage from '@/components/sanity-image'
import Image from 'next/image'
import Sticker from './sticker.svg'
import { PortableText, SanityImageWithAlt } from '@/domain/types'
import { isValidElement } from 'react'
import BreadCrumb from './bread-crumb'
import Heading from './heading'
import StyledPortableText from './styled-portable-text'
import ChatInput from '@/components/chat-input'
import Section from './section'

export const leadStyle = 'max-w-xl pt-4 text-xl md:pt-8 pb-8'

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
    <StyledPortableText spreadParagraphs={false} content={props.lead} />
  )

  return (
    <>
      <header className="full mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pb-20 pt-32 text-base-white md:pb-24 md:pt-44">
        <div className="content">
          {props.links && (
            <BreadCrumb className="pb-2 md:pb-6" links={props.links} />
          )}
          {props.title && <Heading level={1}>{title}</Heading>}
          <div className="grid-cols-2 gap-8 lg:grid">
            <div className={leadStyle}>{lead}</div>
            {props.links?.some((link) => link.name === 'Chatbots') && (
              <Image
                className="row-span-2 mx-auto w-52 place-self-center pt-4 max-lg:hidden lg:rotate-12"
                src={Sticker}
                alt="10 Jahre Apptiva Chatbots"
              />
            )}
            {props.callToAction ? (
              <div className="row-start-2 flex flex-col gap-4">
                <ChatInput mode="inline-input" variant="white" />
                {props.callToAction}
              </div>
            ) : (
              <ChatInput
                mode="inline-input"
                variant="white"
                className="row-start-2"
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
