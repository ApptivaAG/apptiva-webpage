import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import { ModuleData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
import { PortableText } from '@portabletext/react'

export default function TextWithImage(props: { module: ModuleData }) {
  const { module } = props

  const darkBg = module.style === 'dark-bg'
  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level

  return (
    <section
      key={module._key}
      className={cn(
        'full',
        darkBg ? 'bg-primary text-base-white' : 'text-primary',
        isLevel(1) ? 'py-8 lg:py-28' : 'pb-8 lg:pb-28'
      )}
    >
      <div className="content *:[grid-column:feature-start/content-end]">
        <div className="flex items-end gap-x-24 gap-y-8 max-lg:flex-col-reverse">
          <SanityImage
            className="aspect-square rounded object-cover"
            image={module.image}
          />
          <div className="space-y-8 lg:py-16">
            <Heading level={isLevel(1) ? 2 : 3} size={isLevel(1) ? 3 : 4}>
              {module.title}
            </Heading>
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
