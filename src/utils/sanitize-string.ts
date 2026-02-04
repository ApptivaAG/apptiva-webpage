/**
 * Removes invisible Unicode characters that can cause issues with structured data
 * @param str - The string to sanitize
 * @returns The sanitized string without invisible characters, or undefined if input is undefined
 */
export function sanitizeString(str?: string): string | undefined {
  if (!str) return undefined
  return str
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Zero-width spaces
    .replace(/[\u2060-\u206F]/g, '') // Word joiner, invisible formatting
    .replace(/[\uFFF0-\uFFFF]/g, '') // Specials
    .trim()
}
