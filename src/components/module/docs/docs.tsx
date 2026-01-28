import Heading from '@/components/heading'
import Section from '@/components/section'
import { ModuleData } from '@/sanity/lib/queries'
import { cleanStega } from '@/utils/clean-stega'
import { cn } from '@/utils/cn'
import { formatIds } from '@/utils/format-ids'
import { PortableText } from '@portabletext/react'
import { moduleStyleToSectionIntent } from '../utils'
import Doc from './doc'

export default function Docs(props: { module: ModuleData }) {
  const { module } = props
  const style = cleanStega(module.style)
  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level

  const colStyle = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <Section
      intent={moduleStyleToSectionIntent(style)}
      level={isLevel(1) ? 'one' : 'two'}
      id={formatIds(module.title)}
    >
      <div className="content gap-y-10 lg:gap-y-16">
        <div className="flex max-w-3xl flex-col gap-6">
          {module.title && (
            <Heading level={isLevel(2) ? 3 : 2} size={isLevel(2) ? 4 : 2}>
              {module.title}
            </Heading>
          )}
          {module.content && (
            <div className="text-lg leading-relaxed opacity-80">
              <PortableText value={module.content} />
            </div>
          )}
        </div>

        <div className={cn('grid gap-6 lg:gap-8', colStyle)}>
          {module.documents?.map((doc) => <Doc key={doc._key} doc={doc}></Doc>)}
        </div>
      </div>
    </Section>
  )
}
