import { cache } from 'react'
import { queryPostFromCmsBySlug, queryPostsFromCms } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { mapCmsPost } from './mappers'

export const getCmsPostBySlug = cache(
  async (slug: string, isDraft: boolean) => {
    const { published: post } = await load(
      queryPostFromCmsBySlug,
      isDraft,
      {
        slug,
      },
      ['blog', 'person']
    )
    return mapCmsPost(post)
  }
)

export const getCmsPosts = cache(async () => {
  const { published: postsFromCMS } = await load(
    queryPostsFromCms,
    false,
    undefined,
    ['blog', 'person']
  )

  return postsFromCMS.map(mapCmsPost).filter((post) => post !== undefined)
})
