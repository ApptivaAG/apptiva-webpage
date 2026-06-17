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
2. **Forum** (`/forumsangebot`) → `bubble-chat@apptiva.ch`
3. **Chatbot demo** (`/angebot/chatbots/demo-vereinbaren`) → `bubble-chat@apptiva.ch`

**Verify**: Sender copy + internal copy both arrive, check [Resend dashboard](https://resend.com/emails)

### Local Request Capture (Resend)

To inspect the exact request payload sent to Resend (without actually sending), run the local catcher:

```bash
pnpm resend:catch
```

This starts a server on `http://localhost:3999` that accepts `POST /emails` and `POST /emails/batch`, logs the full request (from, to, subject, rendered html, auth header), and writes the captured data to `captured/{kind}/`:

- **`captured/{kind}/request.json`** — full request snapshot (auth token redacted)
- **`captured/{kind}/email-{N}.html`** — rendered HTML of each email in the batch

The `{kind}` is inferred from the recipient email address (`bubble-chat@apptiva.ch` → `bubble`, `info@apptiva.ch` → `apptiva`).

These files are tracked in git — when the email templates change, `git diff` on `captured/bubble/email-1.html` shows exactly what changed.

The catcher returns a mock success response so the server action completes normally. No real emails are sent.

To enable, `RESEND_BASE_URL=http://localhost:3999` is already set in `.env.local` (gitignored). Comment it out to send real emails again.

## Google Reviews Module

The Google Reviews module fetches review data server-side from the Google Places API.

Required environment variables:

- `GOOGLE_REVIEWS_API_KEY`
- `GOOGLE_REVIEWS_PLACE_ID`

If either value is missing or the request fails, the module renders nothing.
