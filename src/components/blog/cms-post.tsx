import BreadCrumb from '@/components/bread-crumb'
import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import Button from '@/components/ui/button'
import { kebabCaseToTitleCase } from '@/utils/format'
import { CmsBlog } from '@/domain/types'
import Link from 'next/link'
import BlogPortableText from '../blog-portable-text'

const kindData = {
  blog: 'Blog',
  'apptiva-lernt': 'Apptiva lernt',
}

export default function CmsBlogPost(props: {
  post: CmsBlog
  previousSlug: string | undefined
  nextSlug: string | undefined
  kind: 'blog' | 'apptiva-lernt'
  Code: React.ComponentType<{ lang?: string; children: React.ReactNode }>
}) {
  const { post, previousSlug, nextSlug, kind, Code } = props

  return (
    <>
      <header className="full relative mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pb-8 pt-32 text-base-white md:pb-16 md:pt-44">
        <div className="content">
          <BreadCrumb
            className="pb-6"
            links={[
              { name: kindData[kind], href: `/${kind}` },
              {
                name: getBreadcrumb(post),
                href: `/${kind}/${post.slug}`,
              },
            ]}
          />
          <Heading level={1} className="hyphens-auto">
            {post.title}
          </Heading>
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
          {post.content && (
            <BlogPortableText Code={Code} content={post.content} />
          )}
          <div className="flex justify-between gap-4 pt-8">
            {previousSlug ? (
              <Link href={`/${kind}/${previousSlug}`} className="no-underline">
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
              <Link href={`/${kind}/${nextSlug}`} className="no-underline">
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
        <aside></aside>
      </div>
    </>
  )
}

function getBreadcrumb(post: CmsBlog) {
  return post.breadcrumb ?? post.title
}
