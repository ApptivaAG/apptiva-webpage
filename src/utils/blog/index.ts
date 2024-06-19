import { queryPostFromCmsBySlug } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { cache } from 'react'
import { CmsBlog, MarkdownBlog } from '../types'
import { getMarkdownPosts } from './markdown'
import { getCmsPostBySlug, getCmsPosts } from './cms'

export function hasTag(kind: 'blog' | 'apptiva-lernt') {
  return ([, post]: [string, { tags?: string[] }]) =>
    kind === 'apptiva-lernt'
      ? post.tags?.includes('Apptiva lernt')
      : !post.tags?.includes('Apptiva lernt')
}

export const getPostBySlug = cache(async (slug: string, isDraft: boolean) => {
  const cmsPost = await getCmsPostBySlug(slug, isDraft)
  if (cmsPost) {
    return cmsPost
  }
  const markdownPosts = await getMarkdownPosts()
  return markdownPosts.find((_) => _.slug === slug)
})

export const getPosts = cache(async () => {
  const cmsPosts = await getCmsPosts()
  const markdownPosts = await getMarkdownPosts()

  const posts = new Map<string, CmsBlog | MarkdownBlog>()
  const mergedBlogposts = [...cmsPosts, ...markdownPosts]
  mergedBlogposts.forEach((post) => {
    const { slug } = post
    if (slug) {
      posts.set(slug, { ...post, slug })
    }
  })
  return posts
})
