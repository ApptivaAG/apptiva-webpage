export type GoogleReview = {
  id: string
  authorName: string
  authorPhotoUrl?: string
  rating: number
  text: string
  relativeTimeDescription?: string
  publishTime?: string
}

export type GoogleReviewsData = {
  placeName?: string
  googleMapsUrl?: string
  averageRating?: number
  reviewCount?: number
  reviews: GoogleReview[]
}

type GooglePlacesReview = {
  authorAttribution?: {
    displayName?: string
    photoUri?: string
  }
  rating?: number
  text?: string | { text?: string }
  relativePublishTimeDescription?: string
  publishTime?: string
  googleMapsUri?: string
}

type GooglePlacesResponse = {
  displayName?: { text?: string }
  googleMapsUri?: string
  rating?: number
  userRatingCount?: number
  reviews?: GooglePlacesReview[]
}

const GOOGLE_REVIEWS_FIELD_MASK = [
  'displayName',
  'googleMapsUri',
  'rating',
  'userRatingCount',
  'reviews',
].join(',')

function logGoogleReviewsIssue(message: string, details?: unknown) {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  console.warn('[Google Reviews]', message, details ?? '')
}

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_REVIEWS_API_KEY
  const placeId = process.env.GOOGLE_REVIEWS_PLACE_ID

  if (!apiKey || !placeId) {
    logGoogleReviewsIssue('Missing environment variable', {
      hasApiKey: Boolean(apiKey),
      hasPlaceId: Boolean(placeId),
    })
    return null
  }

  try {
    const searchParams = new URLSearchParams({
      fields: GOOGLE_REVIEWS_FIELD_MASK,
      languageCode: 'de',
    })

    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?${searchParams.toString()}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
        },
        next: {
          revalidate: 60 * 60 * 6,
        },
      }
    )

    if (!response.ok) {
      const errorBody = await response.text()

      logGoogleReviewsIssue('Google Places API request failed', {
        status: response.status,
        statusText: response.statusText,
        errorBody,
      })
      return null
    }

    const data = (await response.json()) as GooglePlacesResponse
    const reviews = (data.reviews ?? [])
      .map((review, index): GoogleReview | null => {
        const author = review.authorAttribution
        const rating = typeof review.rating === 'number' ? review.rating : 0
        const text =
          typeof review.text === 'string'
            ? review.text
            : review.text?.text ?? ''

        if (!text || rating === 1) {
          return null
        }

        return {
          id: `${placeId}-${review.publishTime ?? index}`,
          authorName: author?.displayName ?? 'Google Nutzer:in',
          authorPhotoUrl: author?.photoUri,
          rating,
          text,
          relativeTimeDescription: review.relativePublishTimeDescription,
          publishTime: review.publishTime,
        }
      })
      .filter((review): review is GoogleReview => review !== null)

    if (!reviews.length) {
      logGoogleReviewsIssue('Google Places API returned no usable reviews', {
        hasReviewsArray: Array.isArray(data.reviews),
        reviewCount: data.reviews?.length ?? 0,
        returnedFields: Object.keys(data),
      })
      return null
    }

    return {
      placeName: data.displayName?.text,
      googleMapsUrl: data.googleMapsUri,
      averageRating: typeof data.rating === 'number' ? data.rating : undefined,
      reviewCount:
        typeof data.userRatingCount === 'number'
          ? data.userRatingCount
          : undefined,
      reviews,
    }
  } catch (error) {
    logGoogleReviewsIssue('Google Places API request threw an error', error)
    return null
  }
}