import { getPosts } from '@/utils/blog'
import { BlogTeaser } from './blog-teaser'

export default async function BlogPosts() {
  const posts = await getPosts()

  const allPosts = Array.from(posts.entries()).toSorted(
    ([, a], [, b]) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )

  return (
    <ul className="grid gap-4 py-16 lg:grid-cols-3">
      {allPosts.map(([slug, post]) => (
        <li key={slug}>
          <BlogTeaser slug={slug} post={post} intent="light" />
        </li>
      ))}
    </ul>
  )
}
