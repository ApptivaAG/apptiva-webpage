import BlogPortableText from '@/components/blog-portable-text'
import CmsBlogPost from '@/components/blog/cms-post'
import BlogPostPreview from '@/components/blog/preview-post'
import { queryPostFromCmsBySlug } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { getPostBySlug, getPosts } from '@/utils/blog'
import { hasTag } from '@/utils/blog/helpers'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getPosts()

  return Array.from(posts.values())
    .filter(hasTag('apptiva-lernt'))
    .map((post) => ({
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

  return {
    title: `${post.meta.title} | Apptiva lernt`,
    description: post.meta.description,
    alternates: { canonical: `/apptiva-lernt/${post.slug}` },
    openGraph: {
      title: post.meta.title,
      type: 'article',
      publishedTime: post.publishDate,
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
        kind="blog"
      />
    )
  }
  const post = (await getPostBySlug(paramsSlug, false)) ?? notFound()

  if (post.kind === 'markdown') {
    return <div>Apptiva lernt unterstützt nur CMS Beiträge</div>
  }

  return (
    <CmsBlogPost
      post={post}
      PortableText={BlogPortableText}
      kind="apptiva-lernt"
      nextSlug={undefined}
      previousSlug={undefined}
    />
  )
}
