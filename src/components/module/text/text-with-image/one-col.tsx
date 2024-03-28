import Section from '@/components/section'
import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import { ModuleData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
import { PortableText } from '@portabletext/react'
import { vercelStegaCleanAll } from '@sanity/client/stega'
import { moduleStyleToSectionIntent } from '../../utils'

export default function TextWithImageOneCol(props: { module: ModuleData }) {
  const { module } = props

  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level

  return (
    <Section
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
          <div className="pb-8">
            <PortableText value={module.content} />
          </div>
        )}
        <SanityImage
          className="popout aspect-square rounded object-cover"
          image={module.image}
          sizes="(max-width: 1024px) 100vw, 40rem"
        />
      </div>
    </Section>
  )
}
