This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

### Production (Coolify)

The production site is hosted on our Coolify server at [https://apptiva.ch](https://apptiva.ch).

On every push to the `master` branch, a Docker image is built via [GitHub Actions](.github/workflows/) and pushed to GitHub Container Registry. A webhook on Coolify then pulls the latest image and redeploys the service.

### Preview (Vercel)

Non-master branches are automatically deployed as preview environments on [Vercel](https://vercel.com), the platform from the creators of Next.js. Each pull request gets a unique preview URL.

## Automated form E2E tests

The Playwright suite covers the contact, forum, chatbot demo, free chatbot trial,
footer newsletter, and chat launcher forms in desktop and mobile Chromium.

```bash
pnpm exec playwright install chromium # Once per machine
pnpm test:e2e                         # Run all browser tests
pnpm test:e2e --project=chromium       # Desktop only
pnpm test:e2e:ui                      # Interactive runner
pnpm test:e2e:report                  # Open the last HTML report
pnpm test:e2e:typecheck               # Type-check the test suite
```

On NixOS, use the system Chromium instead of Playwright's downloaded binary:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH="$(command -v chromium)" pnpm test:e2e
```

Tests start their own Next.js development server on port 3100 and mock services
on port 3101. Leave both ports free. The test server uses `.next-e2e` as its output
directory so it can run alongside your regular development server.
No `.env` files or live API keys are needed.

The browser exercises the real pages and server actions. The Resend SDK sends
HTTP requests directly to the local catcher through `RESEND_BASE_URL`. Both E2E
tests and the manual CLI use `script/lib/resend-catcher.mjs`. MSW intercepts
Mailchimp, the spam classifier, and Plausible. Sanity returns a fixed chatbot
page containing the trial signup module. Other external server
requests fail closed, and the browser blocks third-party scripts and requests.
The suite never sends real email, subscribes real members, or records production
analytics. Keep these mocks enabled when adding tests.

Coverage includes required fields, invalid email addresses, optional fields,
success messages, both rendered email copies and recipient routing, correction
and resubmission, honeypots, AI spam handling, pending states, provider errors,
and retries. Chat launcher tests use a stub widget to check message forwarding,
empty messages, and an unavailable widget without contacting the live chat service.
`e2e/support/mock-services.mjs` controls service responses and captures
outgoing payloads. Each test attaches these payloads to its report. Failures also
save a screenshot and browser trace.

The E2E mock server hosts the shared Resend catcher on port 3101 alongside the
other mocks. `GET /calls` includes its captured HTTP requests, `POST /reset`
clears captures and response settings, and `POST /options` accepts `resendError`
and `delayMs` for failure and pending-state tests. E2E runs keep captures in
memory and never write to the tracked `captured/` directory.

Run the catcher's HTTP, SDK, and CLI tests separately with `pnpm test:resend-catcher`.

[The E2E workflow](.github/workflows/e2e.yml) runs on pull requests and pushes to
`master` without repository secrets. Unit tests remain separate under `pnpm test`.

The unavailable-chat-widget test currently has an expected-failure annotation.
When the SDK is absent, `script#chatbot` creates a named `window.chatbot` property
that is a DOM element, not the widget API. Submitting then throws when calling
`openChatWindow`. The test still runs on both viewports. Once the launcher guards
against a missing API, remove its `test.fail` annotation.

## Email Testing (React-Email v6 + Resend)

### Run Tests

```bash
pnpm test              # Run all tests (57 tests)
pnpm test:watch        # Watch mode
pnpm email:dev         # Preview emails (localhost:3001)
```

### Manual Testing

Test all 3 contact forms with production Resend API:

1. **Main contact** → `info@apptiva.ch`
2. **Forum** (`/forumsangebot`) → `klar@apptiva.ch`
3. **Chatbot demo** (`/angebot/chatbots/demo-vereinbaren`) → `klar@apptiva.ch`

**Verify**: Sender copy + internal copy both arrive, check [Resend dashboard](https://resend.com/emails)

### Local Request Capture (Resend)

To inspect the exact request payload sent to Resend (without actually sending), run the local catcher:

```bash
pnpm resend:catch
```

This starts a loopback-only server on `http://127.0.0.1:3999` that accepts `POST /emails` and `POST /emails/batch`, logs email details with authorization headers redacted, and writes the captured data to `captured/{kind}/`:

- **`captured/{kind}/request.json`** — full request snapshot (auth token redacted)
- **`captured/{kind}/email-{N}.html`** — rendered HTML of each email in the batch

The `{kind}` is inferred from the recipient email address (`klar@apptiva.ch` → `klar`, `info@apptiva.ch` → `apptiva`). Both string and array recipients are supported.

These files are tracked in git — when the email templates change, `git diff` on `captured/klar/email-1.html` shows exactly what changed.

The catcher returns Resend-compatible single-email and batch success responses so the server action completes normally. No real emails are sent. Set `RESEND_CATCHER_PORT` or `RESEND_CAPTURE_DIR` to override the CLI's port or capture directory. File output and logging are optional in the shared implementation; only the manual CLI enables them by default.

To enable, `RESEND_BASE_URL=http://localhost:3999` is already set in `.env.local` (gitignored). Comment it out to send real emails again.

## Google Reviews Module

The Google Reviews module fetches review data server-side from the Google Places API.

Required environment variables:

- `GOOGLE_REVIEWS_API_KEY`
- `GOOGLE_REVIEWS_PLACE_ID`

If either value is missing or the request fails, the module renders nothing.
