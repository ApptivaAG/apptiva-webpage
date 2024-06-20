'use client'

import { PostsQueryData, queryPostsFromCms } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import BlogList from './list'
import { mapCmsPost } from '@/domain/blog/mappers'

export default function BlogPostsPreview(props: {
  initial: QueryResponseInitial<PostsQueryData>
  show: 'blog' | 'apptiva-lernt'
}) {
  const { data } = useQuery<PostsQueryData>(
    queryPostsFromCms.query,
    undefined,
    {
      initial: props.initial,
    }
  )
  const posts = data.map(mapCmsPost).filter((post) => post !== undefined)

  return <BlogList posts={posts} show={props.show} />
}
