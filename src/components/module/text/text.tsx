import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import { ModuleData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
import { PortableText } from '@portabletext/react'

export default function Text(props: { module: ModuleData }) {
  const { module } = props

  const darkBg = module.style === 'dark-bg'
  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level
  const col1 = module.layout === '1-column'

  return (
    <section
      key={module._key}
      className={cn(
        'full py-8 lg:py-28',
        darkBg ? 'bg-primary text-base-white' : 'text-primary'
      )}
    >
      <div className="content">
        <Heading
          level={isLevel(1) ? 2 : 3}
          size={isLevel(1) ? 3 : 4}
          className={
            !col1 ? '[grid-column:content-start/content-gap-start]' : ''
          }
        >
          {module.title}
        </Heading>
        {module.content && (
          <div
            className={
              col1
                ? 'mt-4 max-w-2xl lg:mt-6'
                : '[grid-column:content-gap-end/content-end] max-lg:mt-4'
            }
          >
            <PortableText value={module.content} />
          </div>
        )}
      </div>
    </section>
  )
}
