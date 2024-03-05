export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-08'

export const stegaEnabled =
  (process.env.NEXT_PUBLIC_SANITY_STEGA ?? 'true') === 'true'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const useCdn = false

export const token = assertValue(
  process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
  'Missing environment variable: NEXT_PUBLIC_SANITY_API_READ_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
