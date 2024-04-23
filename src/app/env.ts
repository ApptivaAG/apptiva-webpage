export const rootUrl = process.env.ROOT_URL ?? 'https://apptiva.ch'
export const description =
  'Dein Spezialist für Chatbots und massgeschneiderte Softwarelösungen aus der Schweiz.'
export const title = 'Apptiva AG'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
