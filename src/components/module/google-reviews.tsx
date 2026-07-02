import { getGoogleReviews } from '@/domain/google-reviews'
import { Schema } from '@/components/schema'
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
import { FaGoogle, FaStar } from 'react-icons/fa'

export default async function GoogleReviews(props: { module?: ModuleData }) {
  const { module } = props
  const reviewsData = await getGoogleReviews()

  if (!reviewsData?.reviews.length) {
    return null
  }

  const isLevel = (level: 1 | 2) => (module?.level ?? 1) == level
  const title = module?.title || 'Google Bewertungen'
  const averageRating =
    reviewsData.averageRating ?? averageFromReviews(reviewsData.reviews)
  const reviewCount = reviewsData.reviewCount ?? reviewsData.reviews.length

  return (
    <>
      <GoogleReviewsSchema
        placeName={reviewsData.placeName ?? 'Apptiva AG'}
        googleMapsUrl={reviewsData.googleMapsUrl}
        averageRating={averageRating}
        reviewCount={reviewCount}
        reviews={reviewsData.reviews}
      />
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
              <RatingStars rating={averageRating} />
              <span className="font-semibold">{averageRating.toFixed(1)}/5</span>
              <span>
                Basierend auf {reviewCount} Google-Bewertung
                {reviewCount === 1 ? '' : 'en'}
              </span>
              {reviewsData.googleMapsUrl && (
                <a
                  href={reviewsData.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                  className="underline underline-offset-4"
                >
                  Auf Google ansehen
                </a>
              )}
            </div>
          </div>
        </div>

        <Carousel
          numberOfSlides={reviewsData.reviews.length}
          align="start"
          loop={false}
          className="full pb-20"
        >
          <CarouselContent className="gap-6 md:gap-8">
            {reviewsData.reviews.map((review, index) => (
              <CarouselItem
                key={review.id}
                index={index}
                className="basis-full md:basis-1/3"
              >
                <Card className="flex h-full flex-col gap-4 border-primary/10 bg-base-white p-6 shadow-sm md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <ReviewerAvatar
                        name={review.authorName}
                        imageUrl={review.authorPhotoUrl}
                      />
                      <div>
                        <div className="font-semibold text-primary">
                          {review.authorName}
                        </div>
                        <div className="mt-1">
                          <RatingStars rating={review.rating} />
                          <div className="mt-1 text-sm text-primary/60">
                            {review.relativeTimeDescription ??
                              formatPublishTime(review.publishTime)}
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
    </>
  )
}

function averageFromReviews(reviews: { rating: number }[]) {
  if (!reviews.length) {
    return 0
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0)
  return total / reviews.length
}

function formatPublishTime(value?: string) {
  if (!value) {
    return 'Google-Bewertung'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Google-Bewertung'
  }

  return new Intl.DateTimeFormat('de-CH', {
    month: 'short',
    year: 'numeric',
  }).format(date)
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

function ReviewerAvatar(props: { name: string; imageUrl?: string }) {
  if (props.imageUrl) {
    return (
      <img
        src={props.imageUrl}
        alt={`Profilbild von ${props.name}`}
        referrerPolicy="no-referrer"
        className="h-12 w-12 rounded-full object-cover"
      />
    )
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
      {props.name.slice(0, 1).toUpperCase()}
    </div>
  )
}

function GoogleReviewsSchema(props: {
  placeName: string
  googleMapsUrl?: string
  averageRating: number
  reviewCount: number
  reviews: {
    authorName: string
    rating: number
    text: string
  }[]
}) {
  return (
    <Schema
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: props.placeName,
        url: props.googleMapsUrl,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: Number(props.averageRating.toFixed(1)),
          reviewCount: props.reviewCount,
        },
        review: props.reviews.map((review) => ({
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: review.authorName,
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: review.rating,
            bestRating: 5,
            worstRating: 1,
          },
          reviewBody: review.text,
        })),
      }}
    />
  )
}