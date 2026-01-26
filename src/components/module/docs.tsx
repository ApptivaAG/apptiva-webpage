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
import { FaArrowRight, FaFilePdf, FaLink } from 'react-icons/fa'
import Link from 'next/link'

export default function Docs(props: { module: ModuleData }) {
  const { module } = props
  const style = cleanStega(module.style)
  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level

  // Grid-Steuerung: aiaibot nutzt oft 3 Spalten für Ressourcen
  const colStyle = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <Section
      intent={moduleStyleToSectionIntent(style)}
      level={isLevel(1) ? 'one' : 'two'}
      id={formatIds(module.title)}
    >
      <div className="content gap-y-10 lg:gap-y-16">
        {/* Header-Bereich */}
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

        {/* Dokumenten-Grid */}
        <div className={cn('grid gap-6 lg:gap-8', colStyle)}>
          {module.documents?.map((doc) => {
            // Bestimme das Ziel des Links (PDF-Asset oder externer Link)
            const fileUrl = (doc.file as any)?.asset?.url
            const linkHref = fileUrl || doc.externalLink

            return (
              <Link
                key={doc._key}
                href={linkHref}
                target="_blank"
                rel="noreferrer"
                className="group h-full"
              >
                <Card
                  className="border-slate-100 bg-white flex h-full flex-col gap-5 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  intent="light"
                >
                  {/* Bild / Icon Area */}
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl flex h-14 w-14 items-center justify-center overflow-hidden">
                      {doc.image ? (
                        <SanityImage
                          image={doc.image}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Heading
                      level={4}
                      size={5}
                      className="transition-colors group-hover:text-primary"
                    >
                      {doc.title}
                    </Heading>
                    {doc.description && (
                      <p className="text-slate-500 line-clamp-3 text-sm leading-relaxed">
                        {doc.description}
                      </p>
                    )}
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
