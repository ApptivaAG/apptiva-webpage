import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import Section from '@/components/section'
import StyledPortableText from '@/components/styled-portable-text'
import { cn } from '@/utils/cn'
import { ModuleData } from '@/sanity/lib/queries'
import { formatIds } from '@/utils/format-ids'
import { moduleStyleToSectionIntent } from '../../utils'

export default function TextWithImageOneCol(props: { module: ModuleData }) {
  const { module } = props
  const darkBg = module.style === 'dark-bg'

  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level

  return (
    <Section
      id={formatIds(module.title)}
      intent={moduleStyleToSectionIntent(module.style)}
      level={module.level === 2 ? 'two' : 'one'}
    >
      <div className="content">
        <Heading
          className="pb-4"
          level={isLevel(1) ? 2 : 3}
          size={isLevel(1) ? 3 : 4}
        >
          {module.title}
        </Heading>
        {module.content && (
          <div className={cn('pb-8 prose-inherit', darkBg && 'prose-invert')}>
            <StyledPortableText content={module.content} />
          </div>
        )}
        <SanityImage
          className="popout aspect-square rounded object-cover"
          image={module.image}
          size="popout"
        />
      </div>
    </Section>
  )
}
