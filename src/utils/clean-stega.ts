import { stegaClean } from '@sanity/client/stega'

/**
 * Removes Stega encoding from data using Sanity's stegaClean function.
 * When replacing the underlying implementation, only this file needs to be updated.
 *
 * @param data - The data to clean
 * @returns The cleaned data without Stega encoding
 */
export function cleanStega<T>(data: T): T {
  return stegaClean(data) as T
}
