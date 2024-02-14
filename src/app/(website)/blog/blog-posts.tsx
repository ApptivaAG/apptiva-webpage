import { getPosts } from '@/utils/blog'
import Link from 'next/link'

export default async function BlogPosts({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const posts = await getPosts()

  const allPosts = Array.from(posts.entries())
  const tagsInSearchParams = searchParams['tag']
  const filteredPosts =
    tagsInSearchParams === undefined
      ? allPosts
      : allPosts.filter(([slug, post]) =>
          matchingTags(tagsInSearchParams, post.tags)
        )

  return (
    <ul>
      {filteredPosts.map(([slug, post]) => (
        <li key={slug}>
          <Link href={`/blog/${slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
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
