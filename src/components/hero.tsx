import { CmsContent } from '@/utils/types'
import Heading from './heading'
import StyledPortableText from './styled-portable-text'

export default function Hero({ claim }: { claim: CmsContent }) {
  return (
    <div className="full animate-gradient bg-300% from-primary-light min-h-[52rem] items-center bg-gradient-to-br to-primary-dark px-[9rem] py-[11rem] text-base-white">
      {claim?.map((content) => (
        <StyledPortableText key={content._key} content={content} />
      ))}
    </div>
  )
}
