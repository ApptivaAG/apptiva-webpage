import { getPostBySlug, getPosts, hasTag } from '@/utils/blog'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import CmsBlogPost from './cms-post'
import BlogPostPreview from './preview'
import { load } from '@/sanity/lib/sanityFetch'
import { queryPostFromCmsBySlug } from '@/sanity/lib/queries'
import MarkdownBlogPost from './markdown-post'
import BlogPortableText from '@/components/blog-portable-text'

export async function generateStaticParams() {
  const posts = await getPosts()

  return Array.from(posts)
    .filter(hasTag('blog'))
    .toSorted(
      ([, a], [, b]) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    .map(([slug]) => ({
      slug,
    }))
}

export async function generateMetadata(props: {
  params: { slug: string }
}): Promise<Metadata> {
  const paramsSlug = decodeURIComponent(props.params.slug)
  const post = (await getPostBySlug(paramsSlug, false)) ?? notFound()

  return {
    title: `${post.meta.title} | Blog`,
    description: post.meta.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.meta.title,
      type: 'article',
      url: `/blog/${post.slug}`,
      publishedTime: post.publishDate,
      modifiedTime: post.kind === 'cms' ? post.modifiedDate : undefined,
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
      <BlogPostPreview initial={data.draft} params={{ slug: paramsSlug }} />
    )
  }
  const post = (await getPostBySlug(paramsSlug, isEnabled)) ?? notFound()

  const postSlugs = (await generateStaticParams()).map(({ slug }) => slug)
  const currentIndex = postSlugs.indexOf(paramsSlug)
  const previousSlug = postSlugs[currentIndex - 1]
  const nextSlug = postSlugs[currentIndex + 1]

  return post.kind === 'cms' ? (
    <CmsBlogPost
      post={post}
      previousSlug={previousSlug}
      nextSlug={nextSlug}
      PortableText={BlogPortableText}
    />
  ) : (
    <MarkdownBlogPost
      post={post}
      previousSlug={previousSlug}
      nextSlug={nextSlug}
    />
  )
}
