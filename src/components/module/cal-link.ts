// Akzeptiert "benutzer/event" (auch in Anführungszeichen), eine komplette cal.com-URL oder die Zeile `calLink: "benutzer/event",` aus dem Embed-Code.
export function normalizeCalLink(input?: string | null) {
  const raw =
    input?.trim().match(/calLink\s*:\s*["'`]([^"'`]+)["'`]/)?.[1] ?? input
  const link = raw
    ?.trim()
    .replace(/^["'`]+|["'`,;]+$/g, '')
    .trim()
    .replace(/^https?:\/\/[^/]+\//, '')
    .replace(/^\/+|\/+$/g, '')
  return link || undefined
}

// Jede Kalender-Instanz auf einer Seite braucht einen eigenen Namespace.
export function calNamespaceFromLink(calLink: string) {
  return calLink.replace(/[^a-zA-Z0-9-]+/g, '-')
}
