import Heading from '@/components/heading'
import Link from 'next/link'
import SanityImage from '../../sanity-image'
import { Card } from '../../ui/card'
import UnderlineForLink from '../../ui/underline-for-link'

export default function Doc(props: { doc: any }) {
  const { doc } = props
  const fileUrl = (doc.file as any)?.asset?.url
  const linkHref = fileUrl || doc.externalLink

  return (
    <Card
      className="flex h-full flex-col justify-between gap-5 p-8"
      intent="light"
    >
      <div className="flex flex-1 items-center justify-center">
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

      <div className="row-start-2 mt-auto flex flex-col gap-3">
        <Heading level={4} size={5} className="transition-colors">
          {doc.title}
        </Heading>
        {doc.description && <p>{doc.description}</p>}
      </div>
      {linkHref && (
        <Link
          className="self-end"
          href={linkHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`Zum Artikel: ${doc.title} (öffnet in neuem Fenster)`}
        >
          <UnderlineForLink>Zum Artikel&ensp;→</UnderlineForLink>
        </Link>
      )}
    </Card>
  )
}
