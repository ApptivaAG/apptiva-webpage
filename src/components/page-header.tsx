import SanityImage from '@/components/sanity-image'
import Image from 'next/image'
import Sticker from './sticker.svg'
import { PortableText, SanityImageWithAlt } from '@/domain/types'
import { isValidElement } from 'react'
import BreadCrumb from './bread-crumb'
import Heading from './heading'
import StyledPortableText from './styled-portable-text'

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
    <header className="full relative mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pb-8 pt-32 text-base-white md:pb-16 md:pt-44">
      <div className="content">
        {props.links && (
          <BreadCrumb className="pb-2 md:pb-6" links={props.links} />
        )}
        {props.title && <Heading level={1}>{title}</Heading>}
        <div className="lg:flex">
          <div className="items-center gap-8 lg:flex">
            <div className={leadStyle}>{lead}</div>
            {props.image && (
              <div className="flex h-full w-full justify-center p-8 lg:p-0">
                <SanityImage image={props.image} />
              </div>
            )}
          </div>
          {props.links?.some((link) => link.name === 'Chatbots') && (
            <Image
              className="mx-auto w-52 max-lg:hidden lg:rotate-12"
              src={Sticker}
              alt="10 Jahre Apptiva Chatbots"
            />
          )}
        </div>

        {props.callToAction && (
          <div className="pt-8 md:pt-12">{props.callToAction}</div>
        )}
      </div>
      {props.children}
    </header>
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
