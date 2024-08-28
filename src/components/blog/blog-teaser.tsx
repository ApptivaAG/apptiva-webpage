import SanityImage from '@/components/sanity-image'
import { Card } from '@/components/ui/card'
import { cn } from '@/utils/cn'
import { CmsBlog, MarkdownBlog } from '@/domain/types'
import Image from 'next/image'
import Link from 'next/link'
import UnderlineForLink from '../ui/underline-for-link'

export function BlogTeaser(props: {
  slug: string
  post: CmsBlog | MarkdownBlog
  intent: 'dark' | 'light'
  parentSlug: 'blog' | 'apptiva-lernt'
  className?: string
}) {
  const { slug, post } = props
  return (
    <Card
      key={slug}
      intent={props.intent}
      padding="none"
      className={cn('flex h-full flex-col', props.className)}
    >
      <div className="">
        {post.kind === 'markdown' && post.image?.src && (
          <Image
            className="aspect-video object-cover"
            src={post.image.src}
            width={post.image.width}
            height={post.image.height}
            placeholder="blur"
            blurDataURL={post.image.base64}
            alt=""
            sizes="300px"
          />
        )}
        {post.kind === 'cms' && post.image && (
          <SanityImage
            className="aspect-video object-cover"
            image={post.image}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col items-start gap-4 p-9">
        <p
          className="text-xl font-bold leading-5"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
        <div className="mb-6 flex-1">
          <p className="line-clamp-5">{post.description}</p>
        </div>
        <Link className="self-end" href={`/${props.parentSlug}/${slug}`}>
          <UnderlineForLink>Zum Artikel&ensp;→</UnderlineForLink>
        </Link>
      </div>
    </Card>
  )
}
