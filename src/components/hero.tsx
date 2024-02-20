import { CmsContent } from '@/utils/types'
import StyledPortableText from './styled-portable-text'

export default function Hero({ claim }: { claim: CmsContent }) {
  return (
    <div className="full mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% py-44 text-base-white">
      <div className="content">
        {claim && <StyledPortableText content={claim} spreadParagraphs />}
      </div>
    </div>
  )
}
