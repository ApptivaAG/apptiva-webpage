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
        <div className="space-y-20">
          <div
            className={cn(
              'flex flex-wrap gap-x-32 gap-y-8',
              col1 && 'flex-col'
            )}
          >
            <Heading level={isLevel(1) ? 2 : 3} size={isLevel(1) ? 3 : 4}>
              {module.title}
            </Heading>
            <SanityImage image={module.image} />
            {module.content && (
              <div className="flex-1">
                <PortableText value={module.content} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
