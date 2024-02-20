import { CmsContent } from '@/utils/types'
import StyledPortableText from './styled-portable-text'

export default function Hero({ claim }: { claim: CmsContent }) {
  return (
    <div className="full min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% px-[2rem] pb-[5rem] pt-[11rem] text-base-white lg:px-[9rem] lg:pb-[11rem]">
      {claim?.map((content) => (
        <StyledPortableText
          key={content._key}
          content={content}
          spreadParagraphs
        />
      ))}
    </div>
  )
}
