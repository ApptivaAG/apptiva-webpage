import { cache } from 'react'
import { getCmsPostBySlug, getCmsPosts } from './cms'
import { getMarkdownPosts } from './markdown'

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

  const mergedBlogposts = [...cmsPosts, ...markdownPosts]
  return mergedBlogposts
})
