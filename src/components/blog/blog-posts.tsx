import { getPosts, hasTag } from '@/utils/blog'
import { BlogTeaser } from './blog-teaser'
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

    return <BlogPostsPreview initial={draft} />
  }

  const posts = await getPosts()

  const allPosts = Array.from(posts.entries())
    .filter(hasTag(props.show))
    .map(([, post]) => post)
    .toSorted(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )

  return <BlogList posts={allPosts} show={props.show} />
}
