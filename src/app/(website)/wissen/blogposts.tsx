import { BlogTeaser } from '@/components/blog/blog-teaser'
import Button from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { getPosts } from '@/domain/blog/repository'
import { hasTag } from '@/domain/blog/mappers'
import Link from 'next/link'
import UnderlineForLink from '@/components/ui/underline-for-link'

export default async function Blogposts(props: {
  children: React.ReactNode
  show: 'blog' | 'apptiva-lernt'
}) {
  const posts = await getPosts()

  const last5Posts = posts
    .filter(hasTag(props.show))
    .toSorted(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    .slice(0, 10)

  return (
    <>
      <section className="full py-16 text-primary">
        {props.children}
        <Carousel
          darkTheme={false}
          numberOfSlides={last5Posts.length}
          loop={false}
        >
          <CarouselContent>
            {last5Posts.map((post, index) => (
              <CarouselItem key={post.slug} index={index}>
                <BlogTeaser
                  slug={post.slug}
                  post={post}
                  intent="dark"
                  parentSlug={props.show}
                  className="max-w-md"
                />
              </CarouselItem>
            ))}
            <CarouselItem key="last" index={last5Posts.length}>
              <Card intent="light" className="flex h-full flex-col">
                <p className="flex-1 text-xl font-bold">
                  Weitere{' '}
                  {props.show === 'blog'
                    ? 'Blogposts von der Apptiva'
                    : 'Artikel'}
                </p>
                <Link href={`/${props.show}`} className="block text-right">
                  <UnderlineForLink>
                    Zu allen {props.show === 'blog' ? 'Blogposts' : 'Artikeln'}
                    &ensp;→
                  </UnderlineForLink>
                </Link>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>
    </>
  )
}
