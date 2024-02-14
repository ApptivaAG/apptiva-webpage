import { CmsContent } from '@/utils/types'
import Heading from './heading'
import { PortableText } from '@portabletext/react'
import StyledPortableText from './styled-portable-text'

export default function Hero({ claim }: { claim: CmsContent }) {
  return (
    <div className="full animate-gradient bg-300% from-primary-light flex h-[52rem] items-center justify-center bg-gradient-to-br to-primary-dark">
      <Heading level={1} className="p-8 text-base-white">
        {claim?.map((content) => (
          <StyledPortableText key={content._key} content={content} />
        ))}
      </Heading>
    </div>
  )
}
