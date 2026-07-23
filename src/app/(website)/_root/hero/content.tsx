import Image from 'next/image'
import ChatInput from '@/components/chat-input'
import StyledPortableText from '@/components/styled-portable-text'
import { HomepageDataQueries } from '@/sanity/lib/queries'
import Sticker from './sticker.svg'

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
        <div className="grid-cols-4 lg:grid [&>div]:col-span-3 [&>div]:row-start-2 [&>h1]:col-span-3">
          <StyledPortableText content={content} isHero className="" />
          <Image
            className="row-span-2 w-52 place-self-center lg:rotate-12"
            src={Sticker}
            alt="10 Jahre Apptiva Chatbots"
          />
        </div>
        <ChatInput
          mode="inline-input"
          origin="page-header"
          variant="white"
          className="mt-8 max-lg:max-w-full"
        />
      </div>
    </>
  )
}
