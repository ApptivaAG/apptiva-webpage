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

const GOOGLE_REVIEWS_TIMEOUT_MS = 5000

type GoogleReviewsFailureCode =
  | 'missing_env'
  | 'http_error'
  | 'timeout'
  | 'request_error'
  | 'empty_response'
  | 'unexpected_error'

type GoogleReviewsLogDetails = {
  failureCode: GoogleReviewsFailureCode
  status?: number
  statusText?: string
  hasApiKey?: boolean
  hasPlaceId?: boolean
  reviewCount?: number
  hasReviewsArray?: boolean
  errorName?: string
  errorMessage?: string
}

function logGoogleReviewsIssue(
  message: string,
  details?: GoogleReviewsLogDetails
) {
  console.warn('[Google Reviews]', message, details ?? '')
}

function sanitizeError(error: unknown) {
  if (!(error instanceof Error)) {
    return {
      errorName: 'UnknownError',
      errorMessage: 'Unknown error',
    }
  }

  return {
    errorName: error.name,
    errorMessage: error.message.slice(0, 200),
  }
}

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_REVIEWS_API_KEY
  const placeId = process.env.GOOGLE_REVIEWS_PLACE_ID

  if (!apiKey || !placeId) {
    logGoogleReviewsIssue('Missing environment variable', {
      failureCode: 'missing_env',
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
        cache: 'force-cache',
        next: { revalidate: false },
        signal: AbortSignal.timeout(GOOGLE_REVIEWS_TIMEOUT_MS),
        headers: {
          'X-Goog-Api-Key': apiKey,
        },
      }
    )

    if (!response.ok) {
      logGoogleReviewsIssue('Google Places API request failed', {
        failureCode: 'http_error',
        status: response.status,
        statusText: response.statusText,
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
            : (review.text?.text ?? '')

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
        failureCode: 'empty_response',
        hasReviewsArray: Array.isArray(data.reviews),
        reviewCount: data.reviews?.length ?? 0,
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
  } catch (error: unknown) {
    const sanitizedError = sanitizeError(error)
    const failureCode: GoogleReviewsFailureCode =
      sanitizedError.errorName === 'TimeoutError' ||
      sanitizedError.errorName === 'AbortError'
        ? 'timeout'
        : 'request_error'

    logGoogleReviewsIssue('Google Places API request threw an error', {
      failureCode,
      ...sanitizedError,
    })
    return null
  }
}
