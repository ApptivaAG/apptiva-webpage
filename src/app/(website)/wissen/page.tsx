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
        <div className="content">
          <Heading level={2} size={3}>
            WISSEN wird bei uns gross geschrieben
          </Heading>
          <div className="mt-4 max-w-2xl lg:mt-6">
            <p>
              In unseren wöchentlichen Wissensaustausch-Sitzungen vermitteln wir
              untereinander abwechselnd neues Wissen. Unser Ziel ist es, dieses
              Wissen zu teilen und nicht für uns zu behalten. Deshalb haben wir
              es für dich aufgeschrieben: Durchstöbere unsere Blogposts,
              erweitere deinen Wortschatz mit unserem Glossar oder finde
              Antworten auf deine Fragen in unserem FAQ. Drückt der Schuh bei
              einem Thema, das wir noch nicht behandelt haben, kontaktiere uns
              gerne – wir sind möglicherweise in der Lage, dir weiterzuhelfen.
            </p>
          </div>
        </div>
      </section>

      <section className="full py-16 text-primary">
        <div className="content space-y-4">
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
