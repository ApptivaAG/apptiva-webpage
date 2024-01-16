import { q } from 'groqd'
import { blogsQuery } from '@/sanity/lib/queries'
import { runQuery, sanityFetch } from '@/sanity/lib/sanityFetch'
import { getPosts } from '@/utils/blog'
import { SanityDocument } from 'sanity'

export default async function Home() {
  const posts = await getPosts()

  // Get all of the Pokemon types, and the Pokemon associated to each type.
  const postsFromCMS = await runQuery(
    q('*')
      .filterByType('blog')
      .grab$({
        _id: q.string().optional(),
        slug: q.slug('slug'),
        name: q.string().optional(),
        header: q
          .object({ title: q.string() })
          .optional()
          .default({ title: 'In Arbeit' }),
        tags: q.array(q.object({ name: q.string().optional() })).optional(),
      })
  )

  // Use the schema and the query as you see fit, for example:

  return (
    <>
      <h1
        style={{ fontSize: '30px', fontWeight: 'bold', paddingBottom: '1em' }}
      >
        Blogposts
      </h1>
      <h2
        style={{ fontSize: '20px', fontWeight: 'bold', paddingBottom: '0.5em' }}
      >
        CMS
      </h2>
      <ul>
        {postsFromCMS.map((post) => (
          <li key={post._id}>
            <a href={`/blog/cms/${post.slug}`}>{post.header.title}</a>
          </li>
        ))}
      </ul>
      <h2
        style={{ fontSize: '20px', fontWeight: 'bold', paddingBlock: '0.5em' }}
      >
        Files
      </h2>
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
