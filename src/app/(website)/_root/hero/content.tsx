import { HomepageDataQueries } from '@/sanity/lib/queries'
import StyledPortableText from '@/components/styled-portable-text'
import Image from 'next/image'
import Sticker from './sticker.svg'
import ChatInput from '@/components/chat-input'

export default function Content(props: {
  claim: NonNullable<HomepageDataQueries>
}) {
  const content = Array.isArray(props.claim.claim) ? props.claim.claim : []
  if (!content.length) {
    return <p>No Claim</p>
  }
  return (
    <>
      <div className="content relative">
        <StyledPortableText content={content} isHero />
        <div className="flex-row-reverse items-end lg:-mt-24 lg:flex">
          <Image
            className="mx-auto w-52 lg:rotate-12"
            src={Sticker}
            alt="10 Jahre Apptiva Chatbots"
          />
          <ChatInput
            mode="inline-input"
            origin="page-header"
            variant="white"
            className="mt-8 max-lg:max-w-full"
          />
        </div>
      </div>
    </>
  )
}
