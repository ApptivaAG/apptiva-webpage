'use client'

import { PostsQueryData, queryPostsFromCms } from '@/sanity/lib/queries'
import { mapCmsPost } from '@/utils/blog/map-cms-post'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import BlogList from './list'

export default function BlogPostsPreview({
  initial,
}: {
  initial: QueryResponseInitial<PostsQueryData>
}) {
  const { data } = useQuery<PostsQueryData>(
    queryPostsFromCms.query,
    undefined,
    {
      initial,
    }
  )
  const posts = data.map(mapCmsPost).filter((post) => post !== undefined)

  return <BlogList posts={posts} show="blog" />
}
