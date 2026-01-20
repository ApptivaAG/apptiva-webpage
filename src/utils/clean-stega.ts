import { vercelStegaCleanAll } from '@sanity/client/stega'

/**
 * Removes Vercel Stega encoding from data.
 * This is a wrapper around the deprecated vercelStegaCleanAll function.
 * When replacing the underlying implementation, only this file needs to be updated.
 *
 * @param data - The data to clean
 * @returns The cleaned data without Stega encoding
 */
export function cleanStega<T>(data: T): T {
  return vercelStegaCleanAll(data)
}
