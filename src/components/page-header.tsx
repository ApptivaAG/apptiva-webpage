import Image from 'next/image'
import { isValidElement } from 'react'
import ChatInput from '@/components/chat-input'
import SanityImage from '@/components/sanity-image'
import { PortableText, SanityImageWithAlt } from '@/domain/types'
import BreadCrumb from './bread-crumb'
import Heading from './heading'
import Section from './section'
import Sticker from './sticker.svg'
import StyledPortableText from './styled-portable-text'

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

  const isChatbotOffer = props.links?.some((link) => link.name === 'Chatbots')

  return (
    <>
      <header className="full mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pb-20 pt-32 text-base-white md:pb-24 md:pt-44">
        <div className="content">
          {props.links && (
            <BreadCrumb className="pb-2 md:pb-6" links={props.links} />
          )}
          <div className="grid-cols-5 gap-4 lg:grid">
            {props.title && (
              <Heading
                className={isChatbotOffer ? `col-span-4` : 'col-span-5'}
                level={1}
              >
                {title}
              </Heading>
            )}
            <div className={leadStyle + ' col-span-4 row-start-2'}>{lead}</div>
            {isChatbotOffer && (
              <Image
                className="row-span-2 mx-auto w-52 place-self-end pb-24 max-lg:hidden lg:rotate-12"
                src={Sticker}
                alt="10 Jahre Apptiva Chatbots"
              />
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
