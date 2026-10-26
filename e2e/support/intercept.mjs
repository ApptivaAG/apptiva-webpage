import { HttpResponse, http, passthrough } from 'msw'
import { setupServer } from 'msw/node'
import nextPackage from 'next/package.json' with { type: 'json' }
import { chatbotService } from './sanity-fixture.mjs'

const mockOrigin = 'http://127.0.0.1:3101'

function forward(service) {
  return async ({ request }) => {
    // Forward bodies only, never credentials from the application process.
    return fetch(`${mockOrigin}/${service}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: request.url,
        method: request.method,
        body: await request.json(),
      }),
    })
  }
}

const server = setupServer(
  http.get('https://registry.npmjs.org/-/package/next/dist-tags', () =>
    HttpResponse.json({
      latest: nextPackage.version,
      canary: nextPackage.version,
    })
  ),
  http.all(/^https:\/\/us13\.api\.mailchimp\.com\//, forward('mailchimp')),
  http.post('https://jevtypesafeai.com/api/v1/decide', forward('spam')),
  http.post('https://plausible.io/api/event', forward('analytics')),
  http.get(/^https:\/\/e2e-test\.api(?:cdn)?\.sanity\.io\//, ({ request }) => {
    const query = new URL(request.url).searchParams.get('query') ?? ''
    const isService = /_type\s*==\s*['"]service-page['"]/.test(query)
    const result = isService
      ? query.includes('slug.current == $slug')
        ? chatbotService
        : [chatbotService]
      : []
    return HttpResponse.json({ result, ms: 1, query })
  }),
  http.all('*', async ({ request }) => {
    const { hostname } = new URL(request.url)
    if (['127.0.0.1', 'localhost', '[::1]'].includes(hostname)) {
      return passthrough()
    }

    // Fail closed. An SDK URL change must not turn a test into a real signup.
    await fetch(`${mockOrigin}/unexpected`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: request.url, method: request.method }),
    })
    return HttpResponse.json({ error: 'Blocked by E2E tests' }, { status: 502 })
  })
)

server.listen({ onUnhandledRequest: 'error' })
