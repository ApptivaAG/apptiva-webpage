import BlogPortableText from '@/components/blog-portable-text'
import BreadCrumb from '@/components/bread-crumb'
import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import { getPostBySlug, getPosts } from '@/utils/blog'
import { kebabCaseToTitleCase } from '@/utils/format'
import portableTextToString from '@/utils/portable-text-to-string'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getPosts()

  return Array.from(posts.keys()).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata(props: {
  params: { slug: string }
}): Promise<Metadata> {
  const paramsSlug = decodeURIComponent(props.params.slug)
  const post = (await getPostBySlug(paramsSlug)) ?? notFound()

  return {
    title:
      typeof post.title === 'string'
        ? post.title
        : portableTextToString(post.title),
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      images: [
        {
          url: `https://apptiva-uber-website.netlify.app/_ipx/w_1200,q_75/%2Fassets%2Fblog%2F${paramsSlug}%2F${post.image}`,
        },
      ],
      publishedTime: post.publishDate,
    },
  }
}

export default async function Home(props: { params: { slug: string } }) {
  const paramsSlug = decodeURIComponent(props.params.slug)
  const post = (await getPostBySlug(paramsSlug)) ?? notFound()

  if (post.kind === 'markdown') {
    return <div>Apptiva lernt unterstützt nur CMS Beiträge</div>
  }

  return (
    <>
      <header className="full relative mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pb-8 pt-32 text-base-white md:pb-16 md:pt-44">
        <div className="content">
          <BreadCrumb
            className="pb-6"
            links={[
              { name: 'Apptiva lernt', href: '/apptiva-lernt' },
              {
                name: getBreadcrumb(post),
                href: `/apptiva-lernt/${post.slug}`,
              },
            ]}
          />
          <Heading level={1}>
            <span
              dangerouslySetInnerHTML={{
                __html:
                  typeof post.title === 'string'
                    ? post.title
                    : portableTextToString(post.title),
              }}
            />
          </Heading>
          <p className="max-w-xl pt-6 text-xl">{post.description}</p>
          <p className="pt-2 text-lg text-base-white/60">
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
        <div className="prose prose-lg flex-1">
          {post.content && <BlogPortableText content={post.content} />}
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

function getBreadcrumb(post: Awaited<ReturnType<typeof getPostBySlug>>) {
  if (post?.kind === 'cms') {
    return post.breadcrumb ?? post.title
  }
  return post?.title ?? 'Post'
}