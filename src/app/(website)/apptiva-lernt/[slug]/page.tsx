import CmsBlogPost from '@/components/blog/cms-post'
import BlogPostPreview from '@/components/blog/preview-post'
import { hasTag } from '@/domain/blog/mappers'
import { getPostBySlug, getPosts } from '@/domain/blog/repository'
import { queryPostFromCmsBySlug } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { Code } from 'bright'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.filter(hasTag('apptiva-lernt')).map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata(props: {
  params: { slug: string }
}): Promise<Metadata> {
  const paramsSlug = decodeURIComponent(props.params.slug)
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

export default async function Home(props: { params: { slug: string } }) {
  const paramsSlug = decodeURIComponent(props.params.slug)
  const { isEnabled } = draftMode()

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

  return (
    <CmsBlogPost
      post={post}
      Code={Code}
      kind="apptiva-lernt"
      nextSlug={undefined}
      previousSlug={undefined}
    />
  )
}
