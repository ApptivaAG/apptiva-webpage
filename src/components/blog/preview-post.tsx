'use client'

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
  kind: 'blog' | 'apptiva-lernt'
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
      Code={Code}
      kind={props.kind}
    />
  )
}

function Code(props: { lang?: string; children: React.ReactNode }) {
  return (
    <>
      <p>
        <small>Code sieht nur in der Vorschau so schlecht aus.</small>
      </p>
      <code>
        <pre>{props.children}</pre>
      </code>
    </>
  )
}
