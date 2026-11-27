import { expect, openPage, test } from './support/fixtures'

async function scrollToBottom(page: Parameters<typeof openPage>[0]) {
  await expect
    .poll(async () => {
      await page.evaluate(() =>
        window.scrollTo(0, document.documentElement.scrollHeight)
      )
      return page.evaluate(() => {
        const reveal = document.querySelector('footer > div:last-child')
        const remainingDistance =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight -
          window.scrollY

        return (
          reveal?.classList.contains('relative') === true &&
          remainingDistance <= 1
        )
      })
    })
    .toBe(true)
}

async function expectScrollToTop(page: Parameters<typeof openPage>[0]) {
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeLessThanOrEqual(1)
  await expect(page).toHaveURL('/')
}

test('is at the real bottom of the homepage and scrolls back to the top', async ({
  page,
}) => {
  await openPage(page, '/')
  await scrollToBottom(page)

  const footer = page.locator('footer')
  const button = footer.getByRole('button', { name: 'Zurück nach oben' })
  await expect(button).toBeVisible()
  await expect(button).toBeInViewport()
  expect(
    await button.evaluate((element) => element.closest('footer'))
  ).not.toBeNull()

  await button.click()
  await expectScrollToTop(page)
})

test('activates with Enter and scrolls immediately for reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openPage(page, '/')
  await scrollToBottom(page)

  const button = page
    .locator('footer')
    .getByRole('button', { name: 'Zurück nach oben' })
  await expect(button).toBeInViewport()
  await button.focus()
  await button.press('Enter')

  await expectScrollToTop(page)
})

test('only renders on the homepage and updates after client-side navigation', async ({
  page,
}) => {
  await openPage(page, '/')
  const footer = page.locator('footer')
  await expect(
    footer.getByRole('button', { name: 'Zurück nach oben' })
  ).toHaveCount(1)

  await scrollToBottom(page)
  await footer.getByRole('link', { name: 'Kontakt', exact: true }).click()
  await expect(page).toHaveURL('/kontakt')
  await expect(
    page.locator('footer').getByRole('button', { name: 'Zurück nach oben' })
  ).toHaveCount(0)

  await page
    .locator('footer')
    .getByRole('link', { name: 'Apptiva Logo' })
    .click()
  await expect(page).toHaveURL('/')
  await expect(
    page.locator('footer').getByRole('button', { name: 'Zurück nach oben' })
  ).toHaveCount(1)

  await openPage(page, '/kontakt')
  await expect(
    page.locator('footer').getByRole('button', { name: 'Zurück nach oben' })
  ).toHaveCount(0)
})
