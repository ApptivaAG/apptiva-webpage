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

  const allPosts = Array.from(posts.entries())
  const tagsInSearchParams = searchParams['tag']
  const filteredPosts =
    tagsInSearchParams === undefined
      ? allPosts
      : allPosts.filter(([slug, post]) =>
          matchingTags(tagsInSearchParams, post.tags)
        )

  return (
    <div className="space-y-4">
      <h1>Blog</h1>
      <TagFilter tags={tags} searchParams={searchParams}></TagFilter>

      <ul>
        {filteredPosts.map(([slug, post]) => (
          <li key={slug}>
            <a href={`/blog/${slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
function useQueryState(arg0: string): [any, any] {
  throw new Error('Function not implemented.')
}

function matchingTags(
  searchParamTag: Array<string> | string,
  postTags: Array<string> | undefined
) {
  const tagArray =
    typeof searchParamTag === 'string' ? [searchParamTag] : searchParamTag
  const intersection = tagArray.filter((value) => postTags?.includes(value))
  return intersection.length > 0
}
