import Heading from '@/components/heading'
import { ModuleData } from '@/sanity/lib/queries'
import { formatIds } from '@/utils/format-ids'
import { PortableText } from '@portabletext/react'
import FAQsComponent from '../faqs'
import Section from '../section'
import { moduleStyleToSectionIntent } from './utils'

export default function FAQs(props: { module: ModuleData }) {
  const { module } = props

  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level

  return (
    <>
      {isLevel(2) && (
        <hr className="text-primary max-lg:hidden lg:-translate-y-12" />
      )}

      <Section
        intent={moduleStyleToSectionIntent(module.style)}
        level={isLevel(2) ? 'two' : 'one'}
        id={formatIds(module.title)}
      >
        <div className="content">
          <Heading
            level={isLevel(1) ? 2 : 3}
            size={isLevel(1) ? 3 : 4}
            className="col-left"
          >
            {module.title}
          </Heading>
          {module.content && (
            <div className="col-right max-lg:mt-4">
              <PortableText value={module.content} />
            </div>
          )}
          {module.faqs && <FAQsComponent faqs={module.faqs} />}
        </div>
      </Section>
    </>
  )
}

function xor(a: boolean, b: boolean) {
  return (a || b) && !(a && b)
}
