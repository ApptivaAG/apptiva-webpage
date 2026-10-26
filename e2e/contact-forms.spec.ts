import type { Locator, Page } from '@playwright/test'
import { expect, openPage, sentEmails, test } from './support/fixtures'

const requiredError = 'Ups, ein zwingendes Feld ist noch nicht ausgefüllt.'
const providerError =
  'Leider ist ein Fehler aufgetreten. Versuche es später wieder.'
const email = 'alex@example.com'

type FormDefinition = {
  name: string
  path: string
  button: string
  recipient: string
  subject: string
  required: Record<string, string>
  optional: Record<string, string>
}

const forms: FormDefinition[] = [
  {
    name: 'Contact',
    path: '/kontakt',
    button: 'Senden',
    recipient: 'info@apptiva.ch',
    subject: 'Kontaktformular apptiva.ch',
    required: {
      name: 'Alex Muster',
      email,
      message: 'Ich möchte eine App entwickeln.',
    },
    optional: { company: 'Beispiel AG', referrer: 'Empfehlung' },
  },
  {
    name: 'Forum',
    path: '/forumsangebot',
    button: 'Kostenlos anmelden',
    recipient: 'klar@apptiva.ch',
    subject: "What's next Forumsangebot",
    required: { name: 'Alex Muster', email, company: 'Beispiel AG' },
    optional: {
      phone: '+41 41 555 01 02',
      message: 'Ich möchte mehr über Chatbots erfahren.',
    },
  },
  {
    name: 'Chatbot demo',
    path: '/angebot/chatbots/demo-vereinbaren',
    button: 'Demo anfordern',
    recipient: 'klar@apptiva.ch',
    subject: 'Apptiva Klar Demo vereinbaren',
    required: { name: 'Alex Muster', email, company: 'Beispiel AG' },
    optional: {
      phone: '+41 41 555 01 02',
      message: 'Bitte zeigt mir den Chatbot auf unserer Website.',
      referrer: 'Empfehlung',
    },
  },
  {
    name: 'Free chatbot trial',
    path: '/angebot/chatbots',
    button: 'Jetzt Testzugang sichern!',
    recipient: 'klar@apptiva.ch',
    subject: 'Apptiva Klar 30 Tage kostenlos testen',
    required: { email },
    optional: {},
  },
]

function contactForm(page: Page) {
  return page
    .locator('main form')
    .filter({ has: page.locator('[name="kind"]') })
}

async function fill(form: Locator, values: Record<string, string>) {
  for (const [name, value] of Object.entries(values)) {
    await form.locator(`[name="${name}"]`).fill(value)
  }
}

async function expectSuccess(page: Page, address = email) {
  await expect(page.locator('main')).toContainText(
    'Deine Anfrage wurde erfolgreich an uns versendet.'
  )
  await expect(page.locator('main strong')).toHaveText(address)
  await expect(
    page.getByRole('button', { name: 'Angaben korrigieren' })
  ).toBeVisible()
  await expect(contactForm(page)).toHaveCount(0)
}

for (const definition of forms) {
  test.describe(definition.name, () => {
    test.beforeEach(async ({ page }) => {
      await openPage(page, definition.path)
      await expect(contactForm(page)).toBeVisible()
    })

    test('validates each required field on the server', async ({
      page,
      services,
    }) => {
      const form = contactForm(page)
      for (const field of Object.keys(definition.required)) {
        await fill(form, definition.required)
        await form.locator(`[name="${field}"]`).fill('')
        // Fill first so React hydrates the form before we change its attributes.
        // Bypass native validation to exercise the real server action.
        await form.evaluate((element: HTMLFormElement) => {
          element.noValidate = true
        })
        const submitted = page.waitForResponse(
          (response) => !!response.request().headers()['next-action']
        )
        await form
          .getByRole('button', { name: definition.button, exact: true })
          .click()
        expect((await submitted).ok()).toBeTruthy()
        await expect(form).toContainText(requiredError)
        // Wait for this action to finish before testing the next missing field.
        await expect(
          form.getByRole('button', { name: definition.button, exact: true })
        ).toHaveCSS('pointer-events', 'auto')
      }
      const calls = await services.calls()
      expect(calls.resend).toEqual([])
      expect(calls.spam).toEqual([])
    })

    test('blocks an invalid email in the browser', async ({
      page,
      services,
    }) => {
      const form = contactForm(page)
      await fill(form, definition.required)
      const input = form.locator('[name="email"]')
      await input.fill('not-an-email')
      const actions: string[] = []
      page.on('request', (request) => {
        if (request.headers()['next-action']) actions.push(request.url())
      })
      await form
        .getByRole('button', { name: definition.button, exact: true })
        .click()
      await expect(input).toBeFocused()
      expect(
        await input.evaluate(
          (element: HTMLInputElement) => element.validity.typeMismatch
        )
      ).toBe(true)
      expect(actions).toEqual([])
      expect((await services.calls()).resend).toEqual([])
    })

    test('submits without optional fields and sends both email copies', async ({
      page,
      services,
    }) => {
      await fill(contactForm(page), definition.required)
      await contactForm(page)
        .getByRole('button', { name: definition.button, exact: true })
        .click()
      await expectSuccess(page)
      const calls = await services.calls()
      expect(calls.resend).toHaveLength(1)
      expect(calls.resend[0].method).toBe('POST')
      expect(calls.resend[0].path).toBe('/emails/batch')
      expect(calls.resend[0].headers.authorization).toBe('Bearer ***')
      expect(calls.resend[0].headers['content-type']).toContain(
        'application/json'
      )
      const emails = sentEmails(calls)
      expect(emails).toHaveLength(2)
      expect(emails[0].to).toBe(email)
      expect(emails[1].to).toBe(definition.recipient)
      for (const message of emails) {
        expect(message.subject).toBe(definition.subject)
        expect(message.html).toContain('<html')
      }
      for (const value of Object.values(definition.required)) {
        expect(emails[1].html).toContain(value)
      }
    })

    test('preserves all details when correcting and resubmitting', async ({
      page,
      services,
    }) => {
      const values = { ...definition.required, ...definition.optional }
      await fill(contactForm(page), values)
      await contactForm(page)
        .getByRole('button', { name: definition.button, exact: true })
        .click()
      await expectSuccess(page)
      await page.getByRole('button', { name: 'Angaben korrigieren' }).click()
      const form = contactForm(page)
      for (const [name, value] of Object.entries(values)) {
        await expect(form.locator(`[name="${name}"]`)).toHaveValue(value)
      }
      const corrected = 'alex.corrected@example.com'
      await form.locator('[name="email"]').fill(corrected)
      await form
        .getByRole('button', { name: definition.button, exact: true })
        .click()
      await expectSuccess(page, corrected)
      const emails = sentEmails(await services.calls())
      expect(emails).toHaveLength(4)
      expect(emails[2].to).toBe(corrected)
      for (const value of Object.values(definition.optional)) {
        expect(emails[3].html).toContain(value)
      }
    })

    test('rejects the honeypot without contacting email or spam services', async ({
      page,
      services,
    }) => {
      const form = contactForm(page)
      await fill(form, definition.required)
      await form
        .locator('[name="address"]')
        .evaluate((element: HTMLInputElement) => {
          element.value = 'Filled by a bot'
        })
      await form
        .getByRole('button', { name: definition.button, exact: true })
        .click()
      await expect(form).toContainText(
        'Ups, es scheint als ob du ein Roboter bist.'
      )
      const calls = await services.calls()
      expect(calls.resend).toEqual([])
      expect(calls.spam).toEqual([])
    })

    test('shows pending and provider errors, then allows a retry', async ({
      page,
      services,
    }) => {
      await services.configure({ resendError: true, delayMs: 500 })
      const form = contactForm(page)
      await fill(form, definition.required)
      await form
        .getByRole('button', { name: definition.button, exact: true })
        .click()
      const pending = form.getByRole('button', {
        name: `${definition.button}...`,
        exact: true,
      })
      await expect(pending).toHaveCSS('pointer-events', 'none')
      await expect(form).toContainText(providerError)
      await services.configure({ resendError: false, delayMs: 0 })
      await fill(form, definition.required)
      await form
        .getByRole('button', { name: definition.button, exact: true })
        .click()
      await expectSuccess(page)
      expect((await services.calls()).resend).toHaveLength(2)
    })
  })
}

test('AI-detected spam shows success but sends only an internal spam copy', async ({
  page,
  services,
}) => {
  await services.configure({ spam: true })
  await openPage(page, '/kontakt')
  await fill(contactForm(page), forms[0].required)
  await contactForm(page)
    .getByRole('button', { name: 'Senden', exact: true })
    .click()
  await expectSuccess(page)
  const calls = await services.calls()
  expect(calls.resend).toHaveLength(1)
  expect(calls.resend[0].path).toBe('/emails')
  const emails = sentEmails(calls)
  expect(emails).toHaveLength(1)
  expect(emails[0].to).toBe('spam@apptiva.ch')
  expect(emails[0].subject).toBe('[SPAM?] Kontaktformular apptiva.ch')
})
