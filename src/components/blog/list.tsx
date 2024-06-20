import { CmsBlog, MarkdownBlog } from '@/utils/types'
import { BlogTeaser } from './blog-teaser'

export default async function BlogList(props: {
  posts: (MarkdownBlog | CmsBlog)[]
  show: 'blog' | 'apptiva-lernt'
}) {
  return (
    <ul className="grid gap-4 py-16 lg:grid-cols-3">
      {props.posts.map((post) => (
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
