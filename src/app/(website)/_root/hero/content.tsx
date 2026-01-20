import { HomepageDataQueries } from '@/sanity/lib/queries'
import StyledPortableText from '../../../../components/styled-portable-text'
import Image from 'next/image'
import Sticker from './sticker.svg'

export default function Content(props: {
  claim: NonNullable<HomepageDataQueries>
}) {
  const content = Array.isArray(props.claim.claim) ? props.claim.claim : []
  if (!content.length) {
    return <p>No Claim</p>
  }
  return (
    <div className="content relative">
      <StyledPortableText content={content} isHero />
      <Image
        className="mx-auto -mb-20 mt-4 w-32 lg:-mt-16 lg:mr-20 lg:w-52 lg:rotate-12"
        src={Sticker}
        alt="10 Jahre Apptiva Chatbots"
      />
    </div>
  )
}
