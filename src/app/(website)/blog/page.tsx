import { TagFilter } from '@/components/tag-filter'
import { getPosts } from '@/utils/blog'
import { getTags } from '@/utils/tags'

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const posts = await getPosts()
  const tags = await getTags()

  console.log('search param', searchParams)

  // Use the schema and the query as you see fit, for example:

  return (
    <>
      <h2
        style={{ fontSize: '30px', fontWeight: 'bold', paddingBottom: '1em' }}
      >
        Tags
      </h2>
      <TagFilter tags={tags} searchParams={searchParams}></TagFilter>

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
function useQueryState(arg0: string): [any, any] {
  throw new Error('Function not implemented.')
}
