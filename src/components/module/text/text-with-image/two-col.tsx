import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import Section from '@/components/section'
import StyledPortableText from '@/components/styled-portable-text'
import { ModuleData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
import { formatIds } from '@/utils/format-ids'
import { vercelStegaCleanAll } from '@sanity/client/stega'
import { moduleStyleToSectionIntent } from '../../utils'

export default function TextWithImageTwoCol(props: { module: ModuleData }) {
  const { module } = props

  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level
  const isOrientation = (orientation: 'left' | 'right') =>
    vercelStegaCleanAll(module.orientation) === orientation

  return (
    <Section
      id={formatIds(module.title)}
      intent={moduleStyleToSectionIntent(module.style)}
      level={module.level === 2 ? 'two' : 'one'}
    >
      <div
        className={cn(
          'content',
          isOrientation('left')
            ? '*:col-[feature-start/content-end]'
            : '*:col-[content-start/feature-end]'
        )}
      >
        <div
          className={cn(
            isOrientation('right') && 'flex-row-reverse',
            'flex items-end gap-x-24 gap-y-8 max-lg:flex-col-reverse'
          )}
        >
          <div className="flex-[1.2]">
            <SanityImage
              className="rounded"
              image={module.image}
              sizes="(min-width: 1600px) 660px, (min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="flex-1 space-y-4 lg:space-y-8 lg:py-16">
            <Heading level={isLevel(1) ? 2 : 3} size={isLevel(1) ? 3 : 4}>
              {module.title}
            </Heading>
            {module.content && (
              <div className="flex-1">
                <StyledPortableText content={module.content} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
