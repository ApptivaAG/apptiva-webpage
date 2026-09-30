export async function trackKontaktanfrage({
  kind,
  page,
  userAgent,
  forwardedFor,
}: {
  kind: string
  page: string
  userAgent: string
  forwardedFor: string
}) {
  console.log('trackKontaktanfrage', kind, page, userAgent, forwardedFor)
  try {
    const path = page.startsWith('/') ? page : '/'
    const response = await fetch('https://plausible.io/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'X-Forwarded-For': forwardedFor,
      },
      body: JSON.stringify({
        domain: 'apptiva.ch',
        name: 'Kontaktanfrage',
        url: `https://apptiva.ch${path}`,
        props: { kind, page },
      }),
    })
    if (!response.ok) {
      console.error('Plausible event failed', response.status)
    }
  } catch (error) {
    console.error('Error sending Plausible event', error)
  }
}
