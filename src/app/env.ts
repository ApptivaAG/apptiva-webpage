export const rootUrl = process.env.ROOT_URL ?? 'https://apptiva.ch'
export const description =
  'Entdecke individuelle Softwareentwicklung mit Apptiva: Chatbots, Mobile Apps & Webanwendungen. 100% in der Zentralschweiz entwickelt.'
export const title =
  'Apptiva AG'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
