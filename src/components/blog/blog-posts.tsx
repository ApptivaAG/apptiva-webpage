import { getPosts } from '@/utils/blog'
import { queryPostsFromCms } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import BlogList from './list'
import BlogPostsPreview from './preview'

export default async function BlogPosts(props: {
  show: 'blog' | 'apptiva-lernt'
  isDraft: boolean
}) {
  if (props.isDraft) {
    const { draft } = await load(queryPostsFromCms, props.isDraft, undefined, [
      'service-page',
    ])

    return <BlogPostsPreview initial={draft} show={props.show} />
  }

  const posts = await getPosts()

  return <BlogList posts={Array.from(posts.values())} show={props.show} />
}
