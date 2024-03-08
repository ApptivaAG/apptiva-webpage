import Heading from '@/components/heading'
import { PageHeader } from '@/components/page-header'
import Button from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { getPosts } from '@/utils/blog'
import Link from 'next/link'

export default async function Knowledge() {
  const posts = await getPosts()
  const last5Posts = Array.from(posts.entries()).slice(0, 5)
  return (
    <>
      <PageHeader title="Wissen" lead="Interessantes aus der Apptiva" />
      <section className="full py-16 text-primary">
        <div className="content space-y-4">
          <Heading level={2}>Neueste Blogposts</Heading>
          <div>
            <Button>
              <Link href={'/blog/'}>Alle Blogposts</Link>
            </Button>
          </div>
        </div>
        <Carousel
          darkTheme={true}
          layout="threeSlides"
          numberOfSlides={last5Posts.length}
        >
          <CarouselContent>
            {last5Posts.map(([slug, post], index) => (
              <CarouselItem key={slug} index={index}>
                <Card
                  key={slug}
                  intent="dark"
                  className="flex flex-col items-start gap-4"
                >
                  <Heading level={2}>{post.title}</Heading>
                  <p className="line-clamp-5 flex-1">{post.description}</p>
                  <Button className="self-end" intent={'secondary'}>
                    <Link href={`/blog/${slug}`}>
                      <p>→ Zum Blogpost</p>
                    </Link>
                  </Button>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </>
  )
}
