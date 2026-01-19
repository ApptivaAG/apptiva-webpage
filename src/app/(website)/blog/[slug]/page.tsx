import { Schema } from '@/components/schema'
import { hasTag } from '@/domain/blog/mappers'
import { getPostBySlug, getPosts } from '@/domain/blog/repository'
import { blogBreadcrumbs } from '@/lib/schema/breadcrumbs/blog'
import { queryPostFromCmsBySlug } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { Code } from 'bright'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import CmsBlogPost from '../../../../components/blog/cms-post'
import BlogPostPreview from '../../../../components/blog/preview-post'
import { buildArticleSchema } from '@/lib/schema/article/build-article-schema'

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts
    .filter(hasTag('blog'))
    .toSorted(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    .map((post) => ({
      slug: post.slug,
    }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const paramsSlug = decodeURIComponent((await props.params).slug)
  const post = await getPostBySlug(paramsSlug, false)

  if (!post) {
    return {}
  }

  const url = `/blog/${post.slug}`
  return {
    title: `${post.meta.title} | Blog`,
    description: post.meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.meta.title,
      type: 'article',
      url,
      publishedTime: post.publishDate,
      modifiedTime: post.kind === 'cms' ? post.modifiedDate : undefined,
    },
  }
}

export default async function Home(props: {
  params: Promise<{ slug: string }>
}) {
  const paramsSlug = decodeURIComponent((await props.params).slug)
  const { isEnabled } = await draftMode()

  if (isEnabled) {
    const data = await load(
      queryPostFromCmsBySlug,
      true,
      {
        slug: paramsSlug,
      },
      ['blog']
    )
    if (!data || !data.draft || !data.draft.data) {
      return <p>No preview data.</p>
    }
    return (
      <BlogPostPreview
        initial={data.draft}
        params={{ slug: paramsSlug }}
        kind="blog"
      />
    )
  }
  const post = (await getPostBySlug(paramsSlug, isEnabled)) ?? notFound()
  const breadcrumbs = blogBreadcrumbs({
    name: post.title,
    slug: { current: post.slug },
  })

  const articleSchema = buildArticleSchema({
    name: post.title,
    slug: post.slug,
    publishDate: post.publishDate,
    modifiedDate: post.modifiedDate,
    author: post.author,
    articleType: 'blog',
    description: post.meta.description,
    image: post.image?.asset.url,
    tags: post.tags,
  })
  const schemaArray = [articleSchema, breadcrumbs]

  const postSlugs = (await generateStaticParams()).map(({ slug }) => slug)

  const currentIndex = postSlugs.indexOf(paramsSlug)
  const previousSlug = postSlugs[currentIndex - 1]
  const nextSlug = postSlugs[currentIndex + 1]

  return (
    <>
      <Schema data={schemaArray} />
      <CmsBlogPost
        post={post}
        previousSlug={previousSlug}
        nextSlug={nextSlug}
        Code={Code}
        kind="blog"
      />
    </>
  )
}
