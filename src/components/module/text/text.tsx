import Section from '@/components/section'
import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import StyledPortableText from '@/components/styled-portable-text'
import { ModuleData } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { moduleStyleToSectionIntent } from '../utils'

export default function Text(props: { module: ModuleData }) {
  const { module } = props

  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level
  const col1 = module.layout === '1-column'

  return (
    <Section
      intent={moduleStyleToSectionIntent(module.style)}
      level={isLevel(2) ? 'two' : 'one'}
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
            <StyledPortableText content={module.content} />
          </div>
        )}
      </div>
    </Section>
  )
}
