import Heading from '@/components/heading'
import Section from '@/components/section'
import { ModuleData } from '@/sanity/lib/queries'
import { cleanStega } from '@/utils/clean-stega'
import { formatIds } from '@/utils/format-ids'
import { PortableText } from '@portabletext/react'
import { moduleStyleToSectionIntent } from './utils'
import { cn } from '@/utils/cn'
import { Card } from '../ui/card'
import SanityImage from '../sanity-image'
import StyledPortableText from '../styled-portable-text'

export default function Docs(props: { module: ModuleData }) {
  const { module } = props
  const style = cleanStega(module.style)
  const darkBg = false
  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level

  const colStyle = 'lg:grid-cols-3'
  console.log(' docs: ', props.module.documents)
  return (
    <>
      <Section
        intent={moduleStyleToSectionIntent(style)}
        level={isLevel(1) ? 'one' : 'two'}
        id={formatIds(module.title)}
      >
        <div className="content gap-y-7 lg:gap-y-14">
          {isLevel(2) && (
            <hr className="text-primary max-lg:hidden lg:-translate-y-12" />
          )}
          {module.title && (
            <Heading
              level={isLevel(2) ? 3 : 2}
              size={isLevel(2) ? 4 : 3}
              className="col-left"
            >
              {module.title}
            </Heading>
          )}
          {module.content && (
            <div className="col-right">
              <PortableText value={module.content} />
            </div>
          )}

          <div className={cn('grid gap-7', colStyle)}>
            {module.documents?.map((doc) => {
              // const style = xor(darkBg, cleanStega(doc.style) !== 'inverted')
              //   ? 'dark'
              //   : 'light'
              const style = 'light'
              return (
                <Card
                  key={doc._key}
                  className="relative flex flex-col gap-6 overflow-visible"
                  intent={style}
                >
                  <div className="flex items-start gap-4">
                    <SanityImage image={doc.image} className="flex-none" />
                    <Heading level={isLevel(2) ? 4 : 3} size={5}>
                      {doc.title}
                    </Heading>
                  </div>
                  <p>{doc.description}</p>

                  {/* {doc.description && (
                    <StyledPortableText content={doc.description} />
                  )} */}
                </Card>
              )
            })}
          </div>
        </div>
      </Section>
    </>
  )
}

function xor(a: boolean, b: boolean) {
  return (a || b) && !(a && b)
}
