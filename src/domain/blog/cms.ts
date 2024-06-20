import { queryPostFromCmsBySlug, queryPostsFromCms } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { cache } from 'react'
import { mapCmsPost } from './helpers'

export const getCmsPostBySlug = cache(
  async (slug: string, isDraft: boolean) => {
    const { published: post } = await load(
      queryPostFromCmsBySlug,
      isDraft,
      {
        slug,
      },
      ['blog']
    )
    return mapCmsPost(post)
  }
)

export const getCmsPosts = cache(async () => {
  const { published: postsFromCMS } = await load(
    queryPostsFromCms,
    false,
    undefined,
    ['blog']
  )

  return postsFromCMS.map(mapCmsPost).filter((post) => post !== undefined)
})
