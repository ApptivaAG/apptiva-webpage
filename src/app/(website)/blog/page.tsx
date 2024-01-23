import { getPosts } from '@/utils/blog'
import { getTags } from '@/utils/tags'

export default async function Home() {
  const posts = await getPosts()
  const tags = await getTags()

  // Use the schema and the query as you see fit, for example:

  return (
    <>
      <h2
        style={{ fontSize: '30px', fontWeight: 'bold', paddingBottom: '1em' }}
      >
        Tags
      </h2>
      {tags.map((tag) => (
        <p>{tag.name}</p>
      ))}
      <h2 style={{ fontSize: '30px', fontWeight: 'bold', paddingBlock: '1em' }}>
        Blogposts
      </h2>

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
