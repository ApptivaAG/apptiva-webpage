import { cache } from 'react'
import { getCmsPostBySlug, getCmsPosts } from './cms'

export const getPostBySlug = cache(async (slug: string, isDraft: boolean) => {
  const cmsPost = await getCmsPostBySlug(slug, isDraft)
  return cmsPost
})

export const getPosts = cache(async () => {
  const cmsPosts = await getCmsPosts()
  return cmsPosts
})
