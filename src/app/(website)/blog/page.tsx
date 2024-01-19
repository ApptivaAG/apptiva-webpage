import { getPosts } from '@/utils/blog'

export default async function Home() {
  const posts = await getPosts()

  // Use the schema and the query as you see fit, for example:

  return (
    <>
      <h1
        style={{ fontSize: '30px', fontWeight: 'bold', paddingBottom: '1em' }}
      >
        Blogposts
      </h1>

      <ul>
        {Array.from(posts.entries()).map(([slug, post]) => (
          <li key={slug}>
            <a href={`/blog/${slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
