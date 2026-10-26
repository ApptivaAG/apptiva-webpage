#!/usr/bin/env node
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createResendCatcher } from './lib/resend-catcher.mjs'

const port = Number(process.env.RESEND_CATCHER_PORT || 3999)
const captureDir = process.env.RESEND_CAPTURE_DIR
  ? resolve(process.env.RESEND_CAPTURE_DIR)
  : fileURLToPath(new URL('../captured', import.meta.url))

const { server } = createResendCatcher({
  captureDir,
  log: (...args) => console.log('\x1b[36m[resend-catcher]\x1b[0m', ...args),
})

server.on('error', (error) => {
  console.error('[resend-catcher]', error.message)
  process.exitCode = 1
})
server.listen(port, '127.0.0.1', () => {
  console.log(
    `[resend-catcher] Listening on http://127.0.0.1:${server.address().port}`
  )
  console.log(
    '[resend-catcher] Set RESEND_BASE_URL to this address to capture email requests.'
  )
  console.log(`[resend-catcher] Captures: ${captureDir}`)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => server.close())
}
