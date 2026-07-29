import { FaGoogle, FaStar } from 'react-icons/fa'
import Heading from '@/components/heading'
import Section from '@/components/section'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { ModuleData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
import { formatIds } from '@/utils/format-ids'
import { moduleStyleToSectionIntent } from './utils'

/**
 * Placeholder reviews shown in Sanity draft/preview mode.
 * The real component (google-reviews.tsx) is an async server component that
 * cannot run in a client-component tree. This component uses identical markup
 * so editors see a realistic representation of the section layout.
 */
const MOCK_REVIEWS = [
  {
    id: '1',
    authorName: 'Maria Müller',
    rating: 5,
    text: 'Ausgezeichnete Zusammenarbeit! Das Team hat unsere Anforderungen perfekt umgesetzt und war stets professionell und zuverlässig.',
    relativeTimeDescription: 'vor 2 Monaten',
  },
  {
    id: '2',
    authorName: 'Thomas Schneider',
    rating: 5,
    text: 'Sehr kompetentes Team, das die technischen Herausforderungen effizient gelöst hat. Wir sind sehr zufrieden mit dem Ergebnis.',
    relativeTimeDescription: 'vor 4 Monaten',
  },
  {
    id: '3',
    authorName: 'Sandra Weber',
    rating: 5,
    text: 'Die App wurde termingerecht geliefert und übertrifft unsere Erwartungen. Die Kommunikation war jederzeit transparent und offen.',
    relativeTimeDescription: 'vor 6 Monaten',
  },
]

const MOCK_AVERAGE_RATING = 5
const MOCK_REVIEW_COUNT = 42

export default function GoogleReviewsPreview(props: {
  module?: ModuleData
}) {
  const { module } = props
  const isLevel = (level: 1 | 2) => (module?.level ?? 1) == level
  const title = module?.title || 'Google Bewertungen'

  return (
    <Section
      intent={moduleStyleToSectionIntent(module?.style)}
      level={isLevel(1) ? 'one' : 'two'}
      id={formatIds(title)}
    >
      <div className="content">
        <div className="max-w-3xl space-y-3">
          <Heading level={isLevel(1) ? 2 : 3} size={isLevel(1) ? 3 : 4}>
            {title}
          </Heading>
          <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
            <RatingStars rating={MOCK_AVERAGE_RATING} />
            <span className="font-semibold">
              {MOCK_AVERAGE_RATING.toFixed(1)}/5
            </span>
            <span>
              Basierend auf {MOCK_REVIEW_COUNT} Google-Bewertungen
            </span>
          </div>
          <p className="text-xs text-primary/40 italic">
            Vorschau – echte Bewertungen werden im Live-Modus geladen
          </p>
        </div>
      </div>

      <Carousel
        numberOfSlides={MOCK_REVIEWS.length}
        align="start"
        loop={false}
        className="full pb-20"
      >
        <CarouselContent className="gap-6 md:gap-8">
          {MOCK_REVIEWS.map((review, index) => (
            <CarouselItem
              key={review.id}
              index={index}
              className="basis-full md:basis-1/3"
            >
              <Card className="flex h-full flex-col gap-4 border-primary/10 bg-base-white p-6 shadow-sm md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {review.authorName.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-primary">
                        {review.authorName}
                      </div>
                      <div className="mt-1">
                        <RatingStars rating={review.rating} />
                        <div className="mt-1 text-sm text-primary/60">
                          {review.relativeTimeDescription}
                        </div>
                      </div>
                    </div>
                  </div>
                  <FaGoogle
                    className="mt-1 shrink-0 text-lg text-primary/50"
                    aria-label="Google Bewertung"
                  />
                </div>

                <p className="line-clamp-6 text-base leading-relaxed text-primary/90">
                  {review.text}
                </p>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Section>
  )
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} von 5 Sternen`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <FaStar
          key={index}
          className={cn(
            'text-base',
            index < Math.round(rating)
              ? 'fill-[#fbbc04] text-[#fbbc04]'
              : 'fill-primary/15 text-primary/15'
          )}
        />
      ))}
    </div>
  )
}
