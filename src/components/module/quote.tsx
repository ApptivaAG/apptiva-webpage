import { ModuleData } from '@/sanity/lib/queries'
import StyledPortableText from '../styled-portable-text'
import { FaQuoteLeft } from 'react-icons/fa'
import Heading from '../heading'

export default function Quote(props: { module: ModuleData }) {
  const { module } = props

  return (
    <section
      key={module._key}
      className="full bg-primary px-8 py-8 text-base-white lg:p-60 lg:py-28"
    >
      {module.quotetext && (
        <div>
          <div className="flex lg:mx-0">
            <div className="pr-3 lg:pr-7">
              <div className="rounded-[100%] bg-secondary">
                <FaQuoteLeft className="p-2 text-[30px] text-primary lg:p-6 lg:text-[100px]" />
              </div>
            </div>
            <div className="py-2 lg:py-10">
              <Heading size={4} level={3}>
                <StyledPortableText content={module.quotetext} />
              </Heading>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
