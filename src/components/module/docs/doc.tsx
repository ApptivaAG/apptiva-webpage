import Heading from '@/components/heading'
import Section from '@/components/section'
import { ModuleData } from '@/sanity/lib/queries'
import { cleanStega } from '@/utils/clean-stega'
import { formatIds } from '@/utils/format-ids'
import { PortableText } from '@portabletext/react'
import { moduleStyleToSectionIntent } from '../utils'
import { cn } from '@/utils/cn'
import { Card } from '../../ui/card'
import SanityImage from '../../sanity-image'
import { FaArrowRight, FaFilePdf, FaLink } from 'react-icons/fa'
import Link from 'next/link'
import UnderlineForLink from '../../ui/underline-for-link'

export default function Doc(props: { doc: any }) {
  const { doc } = props
  const fileUrl = (doc.file as any)?.asset?.url
  const linkHref = fileUrl || doc.externalLink

  return (
    <Card
      className="border-slate-100 bg-white flex h-full flex-col gap-5 p-8"
      intent="light"
    >
      <div className="flex items-center justify-between">
        <div className="rounded-xl h-25 w-25 flex items-center justify-center overflow-hidden">
          {doc.previewImage ? (
            <SanityImage
              image={doc.previewImage}
              className="h-full w-full object-cover"
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Heading level={4} size={5} className="transition-colors">
          {doc.title}
        </Heading>
        {doc.description && <p>{doc.description}</p>}
      </div>
      <Link
        className="self-end"
        href={linkHref}
        target="_blank"
        rel="noreferrer"
      >
        <UnderlineForLink>Zum Artikel&ensp;→</UnderlineForLink>
      </Link>
    </Card>
  )
}
