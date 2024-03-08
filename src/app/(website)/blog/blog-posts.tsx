import Heading from '@/components/heading'
import Cards from '@/components/module/cards'
import Button from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getPosts } from '@/utils/blog'
import Link from 'next/link'

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
          <Card className="flex h-full flex-col space-y-4">
            <p className="text-lg font-bold leading-5">{post.title}</p>
            <p className="flex-1">{post.description}</p>
            <Button>
              <Link href={`/blog/${slug}`}>→ Zum Blogpost</Link>
            </Button>
          </Card>
        </li>
      ))}
    </ul>
  )
}
