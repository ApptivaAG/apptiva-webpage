import ChatInput from '@/components/chat-input'
import StyledPortableText from '@/components/styled-portable-text'
import { HomepageDataQueries } from '@/sanity/lib/queries'

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
        <StyledPortableText content={content} isHero className="" />
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
