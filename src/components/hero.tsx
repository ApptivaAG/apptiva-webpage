import { CmsContent } from '@/utils/types'
import StyledPortableText from './styled-portable-text'

export default function Hero({ claim }: { claim: CmsContent }) {
  return (
    <div className="full min-h-[52rem] animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% px-[9rem] py-[11rem] text-base-white">
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
