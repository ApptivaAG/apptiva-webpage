import { expect, openPage, test } from './support/fixtures'

test.beforeEach(async ({ page }) => {
  await openPage(page, '/kontakt')
  // The cached footer can hydrate after the page becomes visible. Refocus until
  // its onFocus handler reveals the mobile fields, rather than using a sleep.
  await expect(async () => {
    const email = page.getByLabel('Deine E-Mail-Adresse')
    await email.blur()
    await email.click()
    await expect(
      page.getByRole('button', { name: 'Abonnieren', exact: true })
    ).toBeVisible({ timeout: 500 })
  }).toPass({ timeout: 10_000 })
})

test('requires an email before subscribing', async ({ page, services }) => {
  await page.getByRole('button', { name: 'Abonnieren', exact: true }).click()
  await expect(page.locator('footer')).toContainText(
    'Bitte die E-Mail-Adresse eintragen.'
  )
  expect((await services.calls()).mailchimp).toEqual([])
})

test('blocks malformed email addresses in the browser', async ({
  page,
  services,
}) => {
  const input = page.getByLabel('Deine E-Mail-Adresse')
  await input.fill('not-an-email')
  const actions: string[] = []
  page.on('request', (request) => {
    if (request.headers()['next-action']) actions.push(request.url())
  })
  await page.getByRole('button', { name: 'Abonnieren', exact: true }).click()
  await expect(input).toBeFocused()
  expect(
    await input.evaluate(
      (element: HTMLInputElement) => element.validity.typeMismatch
    )
  ).toBe(true)
  expect(actions).toEqual([])
  expect((await services.calls()).mailchimp).toEqual([])
})

for (const name of ['', 'Alex']) {
  test(`subscribes ${name ? 'with a first name' : 'without an optional first name'}`, async ({
    page,
    services,
  }) => {
    await page.getByLabel('Deine E-Mail-Adresse').fill('alex@example.com')
    if (name) await page.getByLabel('Dein Vorname').fill(name)
    await page.getByRole('button', { name: 'Abonnieren', exact: true }).click()
    const footer = page.locator('footer')
    await expect(footer).toContainText(`Vielen Dank${name ? ` ${name}` : ''}!`)
    await expect(footer).toContainText(
      'Du hast den Newsletter erfolgreich abonniert.'
    )
    await expect(footer.locator('b')).toHaveText('alex@example.com')
    await expect(page.getByLabel('Deine E-Mail-Adresse')).toHaveCount(0)
    const calls = (await services.calls()).mailchimp
    expect(calls).toHaveLength(1)
    expect(calls[0].method).toBe('PUT')
    expect(new URL(calls[0].url).pathname).toBe(
      '/3.0/lists/9612e94e98/members/alex%40example.com'
    )
    expect(calls[0].body).toEqual({
      email_address: 'alex@example.com',
      status_if_new: 'subscribed',
      ...(name ? { merge_fields: { FNAME: name } } : {}),
    })
  })
}

test('shows pending and provider errors, then allows a retry', async ({
  page,
  services,
}) => {
  await services.configure({ newsletterError: true, delayMs: 500 })
  await page.getByLabel('Deine E-Mail-Adresse').fill('alex@example.com')
  await page.getByRole('button', { name: 'Abonnieren', exact: true }).click()
  await expect(
    page.getByRole('button', { name: 'Abonnieren...', exact: true })
  ).toHaveCSS('pointer-events', 'none')
  await expect(page.locator('footer')).toContainText(
    'Leider ist ein Fehler aufgetreten. Versuche es später wieder.'
  )
  await services.configure({ newsletterError: false, delayMs: 0 })
  await page.getByLabel('Deine E-Mail-Adresse').fill('alex@example.com')
  await page.getByRole('button', { name: 'Abonnieren', exact: true }).click()
  await expect(page.locator('footer')).toContainText(
    'Du hast den Newsletter erfolgreich abonniert.'
  )
  expect((await services.calls()).mailchimp).toHaveLength(2)
})

test('does not show success if Mailchimp did not subscribe the member', async ({
  page,
  services,
}) => {
  await services.configure({ newsletterStatus: 'unsubscribed' })
  await page.getByLabel('Deine E-Mail-Adresse').fill('alex@example.com')
  await page.getByRole('button', { name: 'Abonnieren', exact: true }).click()
  await expect(page.locator('footer')).toContainText(
    'Leider ist ein Fehler aufgetreten. Versuche es später wieder.'
  )
  await expect(
    page.getByRole('button', { name: 'Abonnieren', exact: true })
  ).toBeVisible()
  expect((await services.calls()).mailchimp).toHaveLength(1)
})
