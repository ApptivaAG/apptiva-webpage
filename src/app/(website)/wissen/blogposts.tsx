import Heading from '@/components/heading'
import Button from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { getPosts } from '@/utils/blog'
import Link from 'next/link'
import { BlogTeaser } from '../blog/blog-teaser'

export default async function Blogposts() {
  const posts = await getPosts()

  const last5Posts = Array.from(posts.entries())
    .toSorted(
      ([, a], [, b]) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    .slice(0, 10)

  return (
    <>
      <section className="full py-16 text-primary">
        <div className="content space-y-8">
          <Heading level={2} size={3}>
            Neueste Blogposts
          </Heading>
          <div>
            <Link href={'/blog/'}>
              <Button element="div" className="inline">
                Alle Blogposts
              </Button>
            </Link>
          </div>
        </div>
        <Carousel
          darkTheme={false}
          layout="fiveSlides"
          numberOfSlides={last5Posts.length}
          loop={false}
        >
          <CarouselContent>
            {last5Posts.map(([slug, post], index) => (
              <CarouselItem key={slug} index={index}>
                <BlogTeaser slug={slug} post={post} intent="dark" />
              </CarouselItem>
            ))}
            <CarouselItem key="last" index={last5Posts.length}>
              <Card intent="light" className="flex flex-col">
                <p className="flex-1 text-lg font-bold">
                  Weitere Blogposts von der Apptiva
                </p>
                <Link href={'/blog'} className="block translate-y-3 text-right">
                  <Button
                    intent="secondary"
                    element="div"
                    className="inline-block"
                  >
                    → Zu allen Blogposts
                  </Button>
                </Link>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>
    </>
  )
}
