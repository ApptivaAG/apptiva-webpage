import { getPosts } from '@/utils/blog'

export default async function Home() {
  const posts = await getPosts()

  return (
    <>
      <h1>Blogposts</h1>
      <ul>
        {Array.from(posts.entries()).map(([slug, post]) => (
          <li key={slug}>
            <a href={`/blog/${slug}`}>{post.frontmatter.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
