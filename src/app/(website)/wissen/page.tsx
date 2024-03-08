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
            <Link href={'/blog/'}>
              <Button element="div" className="inline">
                Alle Blogposts
              </Button>
            </Link>
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
                  <Link className="self-end" href={`/blog/${slug}`}>
                    <Button
                      element="div"
                      className="inline"
                      intent={'secondary'}
                    >
                      → Zum Blogpost
                    </Button>
                  </Link>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </>
  )
}
