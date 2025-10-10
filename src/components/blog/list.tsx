import { CmsBlog } from '@/domain/types'
import { BlogTeaser } from './blog-teaser'
import { hasTag } from '@/domain/blog/mappers'

export default function BlogList(props: {
  posts: CmsBlog[]
  show: 'blog' | 'apptiva-lernt'
}) {
  const sortedFilteredPosts = props.posts
    .filter(hasTag(props.show))
    .toSorted(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )

  return (
    <ul className="grid gap-4 py-16 lg:grid-cols-3">
      {sortedFilteredPosts.map((post) => (
        <li key={post.slug} className="first:lg:col-span-full">
          <BlogTeaser
            slug={post.slug}
            post={post}
            intent="light"
            parentSlug={props.show}
          />
        </li>
      ))}
    </ul>
  )
}
