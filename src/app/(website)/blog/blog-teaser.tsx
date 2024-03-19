import SanityImage from '@/components/sanity-image'
import Button from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CmsBlog, MarkdownBlog } from '@/utils/types'
import Image from 'next/image'
import Link from 'next/link'

export function BlogTeaser(props: {
  slug: string
  post: CmsBlog | MarkdownBlog
  intent: 'dark' | 'light'
}) {
  const { slug, post } = props
  return (
    <Card
      key={slug}
      intent={props.intent}
      padding="none"
      className="flex h-full max-w-md flex-col overflow-hidden"
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
          className="text-lg font-bold leading-5"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
        <p className="line-clamp-5 flex-1">{post.description}</p>
        <Link className="self-end pt-6" href={`/blog/${slug}`}>
          <Button
            element="div"
            className="inline"
            intent={props.intent === 'dark' ? 'secondary' : 'primary'}
          >
            → Zum Blogpost
          </Button>
        </Link>
      </div>
    </Card>
  )
}
