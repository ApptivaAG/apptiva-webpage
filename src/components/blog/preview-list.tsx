'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { mapCmsPost } from '@/domain/blog/mappers'
import { PostsQueryData, queryPostsFromCms } from '@/sanity/lib/queries'
import BlogList from './list'

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
