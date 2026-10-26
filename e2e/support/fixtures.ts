import { test as base, expect, type Page } from '@playwright/test'

type Email = { to: string | string[]; subject: string; html: string }
type Call<T> = { url: string; method: string; body: T }
export type ServiceCalls = {
  resend: {
    method: string
    path: string
    headers: Record<string, string | string[] | undefined>
    body: Email[] | Email
    kind: string
  }[]
  mailchimp: Call<{
    email_address: string
    status_if_new: string
    merge_fields?: { FNAME: string }
  }>[]
  spam: Call<unknown>[]
  analytics: Call<unknown>[]
  unexpected: { url: string; method: string }[]
}

type MockServices = {
  configure: (options: {
    resendError?: boolean
    newsletterError?: boolean
    newsletterStatus?: string
    spam?: boolean
    delayMs?: number
  }) => Promise<void>
  calls: () => Promise<ServiceCalls>
}

export const test = base.extend<{ services: MockServices }>({
  services: [
    async ({ request }, use, testInfo) => {
      const origin = 'http://127.0.0.1:3101'
      expect((await request.post(`${origin}/reset`)).ok()).toBeTruthy()
      const services: MockServices = {
        async configure(options) {
          expect(
            (await request.post(`${origin}/options`, { data: options })).ok()
          ).toBeTruthy()
        },
        async calls() {
          const response = await request.get(`${origin}/calls`)
          expect(response.ok()).toBeTruthy()
          return response.json()
        },
      }
      await use(services)
      const calls = await services.calls()
      await testInfo.attach('service-calls', {
        body: JSON.stringify(calls, null, 2),
        contentType: 'application/json',
      })
      expect(calls.unexpected, 'Unexpected external server requests').toEqual(
        []
      )
    },
    { auto: true },
  ],
  page: async ({ page, context, baseURL }, use) => {
    // Consent is not under test. Seed necessary-only consent before hydration.
    await context.addCookies([
      {
        name: 'cc_cookie',
        value: encodeURIComponent(
          JSON.stringify({
            categories: ['necessary'],
            revision: 0,
            data: null,
            consentTimestamp: new Date().toISOString(),
            consentId: 'f181de6b-0698-43a1-a4e4-7cc489f21441',
            services: { necessary: [] },
            lastConsentTimestamp: new Date().toISOString(),
          })
        ),
        url: baseURL,
      },
    ])
    await context.route('**/*', async (route) => {
      const request = route.request()
      const url = new URL(request.url())
      if (url.origin !== baseURL) return route.abort()
      if (url.pathname === '/js/script.js' || url.pathname === '/api/event') {
        return route.fulfill({ status: 200, body: '' })
      }
      // Scrolling to the footer should not prefetch unrelated CMS pages.
      if (request.headers()['next-router-prefetch']) return route.abort()
      return route.continue()
    })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await use(page)
    expect(errors, 'Uncaught browser errors').toEqual([])
  },
})

export { expect }

export async function openPage(page: Page, path: string) {
  const response = await page.goto(path)
  expect(response?.ok()).toBeTruthy()
  await expect(page.locator('main')).toBeVisible()
}

export function sentEmails(calls: ServiceCalls): Email[] {
  return calls.resend.flatMap((call) => call.body)
}
