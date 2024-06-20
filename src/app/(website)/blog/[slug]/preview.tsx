'use client'

import StyledPortableText from '@/components/styled-portable-text'
import {
  PostBySlugQueryData,
  queryPostFromCmsBySlug,
} from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import CmsBlogPost from './cms-post'
import { mapCmsPost } from '@/utils/blog/helpers'

export default function BlogPostPreview(props: {
  initial: QueryResponseInitial<PostBySlugQueryData>
  params: {
    slug: string
  }
}) {
  const { data } = useQuery<PostBySlugQueryData>(
    queryPostFromCmsBySlug.query,
    props.params,
    { initial: props.initial }
  )

  const post = mapCmsPost(data)

  if (!post) {
    return <p>Preview not available.</p>
  }

  return (
    <CmsBlogPost
      post={post}
      nextSlug={undefined}
      previousSlug={undefined}
      PortableText={StyledPortableText}
    />
  )
}
