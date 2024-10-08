import { ModuleData } from '@/sanity/lib/queries'
import StyledPortableText from '../styled-portable-text'
import { FaQuoteLeft } from 'react-icons/fa'
import Heading from '../heading'

export default function Quote(props: { module: ModuleData }) {
  const { module } = props

  return (
    <section
      key={module._key}
      className="full bg-primary py-8 text-base-white lg:py-28"
    >
      {module.quotetext && (
        <div className="content">
          <div className="flex items-start gap-3 lg:gap-7 lg:pl-24">
            <div className="rounded-full bg-secondary">
              <FaQuoteLeft className="p-2 text-3xl text-primary lg:p-6 lg:text-[100px]" />
            </div>
            <div className="py-2 lg:py-10">
              <StyledPortableText content={module.quotetext} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
