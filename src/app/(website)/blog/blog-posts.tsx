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
            <p
              className="text-lg font-bold leading-5"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
            <p className="line-clamp-5">{post.description}</p>
            <div className="h-2"></div>
            <Link className="!mt-auto" href={`/blog/${slug}`}>
              <Button element="div" className="inline">
                → Zum Blogpost
              </Button>
            </Link>
          </Card>
        </li>
      ))}
    </ul>
  )
}
