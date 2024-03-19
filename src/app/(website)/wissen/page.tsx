import Heading from '@/components/heading'
import { PageHeader } from '@/components/page-header'
import Button from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { getPosts } from '@/utils/blog'
import Link from 'next/link'
import { BlogTeaser } from '../blog/blog-teaser'

export default async function Knowledge() {
  const posts = await getPosts()
  const last5Posts = Array.from(posts.entries())
    .toSorted(
      ([, a], [, b]) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    .slice(0, 10)

  return (
    <>
      <PageHeader
        title="Wissen"
        lead="Interessantes aus der Apptiva"
        links={[{ name: 'Wissen', href: '/wissen' }]}
      />
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
          darkTheme={false}
          layout="fiveSlides"
          numberOfSlides={last5Posts.length}
          loop={true}
        >
          <CarouselContent>
            {last5Posts.map(([slug, post], index) => (
              <CarouselItem key={slug} index={index}>
                <BlogTeaser slug={slug} post={post} intent="dark" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </>
  )
}
