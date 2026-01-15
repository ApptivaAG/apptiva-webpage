import CmsBlogPost from '@/components/blog/cms-post'
import BlogPostPreview from '@/components/blog/preview-post'
import { Schema } from '@/components/schema'
import { hasTag } from '@/domain/blog/mappers'
import { getPostBySlug, getPosts } from '@/domain/blog/repository'
import { buildArticleSchema } from '@/lib/schema/article/build-article-schema'
import { apptivaLerntBreadcrumbs } from '@/lib/schema/breadcrumbs/apptiva-lernt'
import { queryPostFromCmsBySlug } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { Code } from 'bright'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts
    .filter(hasTag('apptiva-lernt'))
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

  const url = `/apptiva-lernt/${post.slug}`
  return {
    title: `${post.meta.title} | Apptiva lernt`,
    description: post.meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.meta.title,
      type: 'article',
      url,
      publishedTime: post.publishDate,
      modifiedTime: post.modifiedDate,
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
        kind="apptiva-lernt"
      />
    )
  }
  const post = (await getPostBySlug(paramsSlug, false)) ?? notFound()
  const breadcrumbs = apptivaLerntBreadcrumbs({
    slug: { current: post.slug },
    name: post.title,
  })
  const articleSchema = buildArticleSchema({
    name: post.title,
    slug: post.slug,
    publishDate: post.publishDate,
    modifiedDate: post.modifiedDate,
    author: post.author,
    articleType: 'apptiva-lernt',
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
        Code={Code}
        kind="apptiva-lernt"
        nextSlug={nextSlug}
        previousSlug={previousSlug}
      />
    </>
  )
}
