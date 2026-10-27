import { expect, openPage, test } from './support/fixtures'

type ChatWindow = Window & {
  chatCalls: { opened: number; messages: string[] }
  chatbot?: {
    openChatWindow: () => void
    enterGuestMessage: (message: string) => void
    subscribe: () => void
  }
}

test.beforeEach(async ({ page }) => {
  // Exercise the launcher without loading or messaging the live chat service.
  await page.addInitScript(() => {
    const target = window as unknown as ChatWindow
    target.chatCalls = { opened: 0, messages: [] }
    target.chatbot = {
      openChatWindow() {
        target.chatCalls.opened += 1
      },
      enterGuestMessage(message) {
        target.chatCalls.messages.push(message)
      },
      subscribe() {},
    }
  })
  await openPage(page, '/kontakt')
  // The server-rendered form is visible before React attaches its submit
  // handler. Wait for hydration so Enter cannot trigger a native GET reload.
  await expect(
    page.locator('main [data-chat-input="inline"]')
  ).toHaveAttribute('data-chat-input-ready', 'true')
})

test('opens chat, forwards the question, and clears the input', async ({
  page,
}) => {
  const form = page.locator('main [data-chat-input="inline"] form')
  const input = form.getByPlaceholder('Frage unsere KI ...')
  const question = 'Wie kann ich eine Chatbot-Demo buchen?'
  await input.fill(question)
  await form.getByRole('button').click()
  await expect(input).toHaveValue('')
  expect(
    await page.evaluate(() => (window as unknown as ChatWindow).chatCalls)
  ).toEqual({
    opened: 1,
    messages: [question],
  })
  await expect(page).toHaveURL('/kontakt')
})

test('opens chat without forwarding a whitespace-only message', async ({
  page,
}) => {
  const input = page.locator('main').getByPlaceholder('Frage unsere KI ...')
  await input.fill('   ')
  await input.press('Enter')
  expect(
    await page.evaluate(() => (window as unknown as ChatWindow).chatCalls)
  ).toEqual({
    opened: 1,
    messages: [],
  })
  await expect(page).toHaveURL('/kontakt')
})

test('keeps the question when the chat widget is unavailable', async ({
  page,
}) => {
  // Next.js loads this script lazily. Wait for its named DOM property before
  // removing the stub, otherwise this scenario depends on browser idle timing.
  await expect(page.locator('script#chatbot')).toBeAttached()
  await page.evaluate(() => {
    delete (window as unknown as ChatWindow).chatbot
  })
  const input = page.locator('main').getByPlaceholder('Frage unsere KI ...')
  await input.fill('Ist jemand erreichbar?')
  await input.press('Enter')
  await expect(input).toHaveValue('Ist jemand erreichbar?')
  await expect(page).toHaveURL('/kontakt')
})
