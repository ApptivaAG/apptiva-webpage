import BreadCrumb from '@/components/bread-crumb'
import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import Button from '@/components/ui/button'
import { kebabCaseToTitleCase } from '@/utils/format'
import { CmsBlog, MarkdownBlog } from '@/utils/types'
import Link from 'next/link'

export default function CmsBlogPost(props: {
  post: CmsBlog
  previousSlug: string | undefined
  nextSlug: string | undefined
  PortableText: any
}) {
  const { post, previousSlug, nextSlug, PortableText } = props

  return (
    <>
      <header className="full relative mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pb-8 pt-32 text-base-white md:pb-16 md:pt-44">
        <div className="content">
          <BreadCrumb
            className="pb-6"
            links={[
              { name: 'Blog', href: '/blog' },
              {
                name: getBreadcrumb(post),
                href: `/blog/${post.slug}`,
              },
            ]}
          />
          <Heading level={1}>{post.title}</Heading>
          <p className="max-w-xl pt-6 text-xl">{post.description}</p>
          <p className="pt-2 text-base-white/60">
            Publiziert am{' '}
            <time dateTime={post.publishDate} className="font-bold">
              {new Date(post.publishDate).toLocaleDateString('de-CH')}
            </time>{' '}
            von{' '}
            <strong className="font-bold">
              {kebabCaseToTitleCase(post.author.toString())}
            </strong>
          </p>
          <div className="popout justify-center pt-8 md:pt-16">
            {post.image && (
              <SanityImage
                className="rounded-lg"
                image={post.image}
                size="popout"
              />
            )}
          </div>
        </div>
      </header>

      <div className="flex gap-16 py-16 max-md:flex-col">
        <div className="prose flex-1">
          {post.content && <PortableText content={post.content} />}
          <div className="flex justify-between gap-4 pt-8">
            {previousSlug ? (
              <Link href={`/blog/${previousSlug}`} className="no-underline">
                <Button
                  intent="primary"
                  element="div"
                  className="flex items-center gap-4"
                >
                  <span className="text-l">←</span>Zum vorherigen Artikel
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {nextSlug && (
              <Link href={`/blog/${nextSlug}`} className="no-underline">
                <Button
                  intent="primary"
                  element="div"
                  className="flex items-center gap-4"
                >
                  Zum nächsten Artikel<span className="text-l">→</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
        <aside>
          {post.tags && post.tags.length > 0 && (
            <>
              <p>Tags</p>
              <ul>
                {post.tags && post.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </>
          )}
        </aside>
      </div>
    </>
  )
}

function getBreadcrumb(post: MarkdownBlog | CmsBlog) {
  if (post?.kind === 'cms') {
    return post.breadcrumb ?? post.title
  }
  return post?.title ?? 'Post'
}
