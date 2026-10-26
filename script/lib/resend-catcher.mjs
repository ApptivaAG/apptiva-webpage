import { randomUUID } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { resolve } from 'node:path'
import { setTimeout } from 'node:timers/promises'

function redactHeaders(headers) {
  return Object.fromEntries(
    Object.entries(headers).map(([name, value]) => [
      name,
      /^(authorization|proxy-authorization)$/i.test(name)
        ? `${String(value).split(/\s+/)[0]} ***`
        : value,
    ])
  )
}

function inferKind(emails) {
  for (const email of emails) {
    const recipients = Array.isArray(email.to) ? email.to : [email.to]
    if (
      recipients.some((to) =>
        ['bubble-chat@apptiva.ch', 'klar@apptiva.ch'].includes(to)
      )
    ) {
      return 'klar'
    }
    if (recipients.includes('info@apptiva.ch')) return 'apptiva'
  }
  return String(emails[0]?.subject || 'unknown')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 40)
}

const VOID_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
])
const INVISIBLE_RUN = /[\u200B-\u200F\u2060\uFEFF\u00AD\u034F\s]{20,}/g

function formatHtml(html) {
  const tokens = html.match(/<!--[\s\S]*?-->|<![^>]*>|<[^>]+>|[^<]+/g) || []
  const lines = []
  let depth = 0
  for (const token of tokens) {
    if (token.startsWith('<!--') || token.startsWith('<!')) {
      lines.push('  '.repeat(depth) + token)
    } else if (token.startsWith('</')) {
      depth = Math.max(0, depth - 1)
      lines.push('  '.repeat(depth) + token)
    } else if (token.startsWith('<')) {
      const name = /^<([a-zA-Z0-9-]+)/.exec(token)?.[1]?.toLowerCase()
      lines.push('  '.repeat(depth) + token)
      if (name && !VOID_TAGS.has(name) && !token.endsWith('/>')) depth++
    } else {
      const text = token
        .replace(INVISIBLE_RUN, ' [invisible padding] ')
        .replace(/\s+/g, ' ')
        .trim()
      if (text) lines.push('  '.repeat(depth) + text)
    }
  }
  return `${lines.join('\n')}\n`
}

function writeCapture(captureDir, snapshot, emails) {
  const directory = resolve(captureDir, snapshot.kind)
  mkdirSync(directory, { recursive: true })
  // Preserve the manual catcher's normalized email array in request.json.
  writeFileSync(
    resolve(directory, 'request.json'),
    `${JSON.stringify({ ...snapshot, body: emails }, null, 2)}\n`
  )
  emails.forEach((email, index) => {
    if (email.html) {
      writeFileSync(
        resolve(directory, `email-${index + 1}.html`),
        formatHtml(email.html)
      )
    }
  })
  return directory
}

function logCapture(log, snapshot, emails, directory) {
  if (!log) return
  log(`Captured ${snapshot.method} ${snapshot.path} (${snapshot.kind})`)
  log('Headers:', JSON.stringify(snapshot.headers))
  for (const [index, email] of emails.entries()) {
    log(
      `Email ${index + 1}:`,
      JSON.stringify({
        from: email.from,
        to: email.to,
        subject: email.subject,
      })
    )
    log(
      'HTML:',
      email.html ? `${email.html.substring(0, 120)}...` : '(no HTML)'
    )
  }
  if (directory) log(`Saved to ${directory}`)
}

/**
 * A local Resend HTTP server. It never forwards requests to Resend.
 * Captures stay in memory unless captureDir is supplied. handleOtherRequest
 * lets the E2E mock server add its existing /calls, /reset and /options routes.
 */
export function createResendCatcher({
  captureDir,
  log,
  handleOtherRequest,
} = {}) {
  let requests = []
  let options = { error: false, delayMs: 0 }

  const reply = (response, body, status = 200) => {
    response.writeHead(status, { 'Content-Type': 'application/json' })
    response.end(`${JSON.stringify(body)}\n`)
  }

  const server = createServer(async (request, response) => {
    try {
      const pathname = new URL(request.url, 'http://127.0.0.1').pathname
      if (pathname !== '/emails' && pathname !== '/emails/batch') {
        if (handleOtherRequest)
          return await handleOtherRequest(request, response)
        return reply(response, { error: 'Not found' }, 404)
      }
      if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST')
        return reply(response, { error: 'Only POST is supported' }, 405)
      }

      const chunks = []
      for await (const chunk of request) chunks.push(chunk)
      let body
      try {
        body = JSON.parse(Buffer.concat(chunks).toString())
      } catch {
        return reply(response, { error: 'Invalid JSON' }, 400)
      }

      const batch = pathname === '/emails/batch'
      const emails = Array.isArray(body) ? body : [body]
      if (
        batch !== Array.isArray(body) ||
        emails.length === 0 ||
        emails.some(
          (email) => !email || typeof email !== 'object' || Array.isArray(email)
        )
      ) {
        return reply(response, { error: 'Invalid email payload' }, 400)
      }

      const snapshot = {
        receivedAt: new Date().toISOString(),
        method: request.method,
        path: pathname,
        headers: redactHeaders(request.headers),
        body,
        kind: inferKind(emails),
      }
      requests.push(snapshot)
      const current = { ...options }
      const directory = captureDir
        ? writeCapture(captureDir, snapshot, emails)
        : undefined
      logCapture(log, snapshot, emails, directory)

      if (current.delayMs) await setTimeout(current.delayMs)
      if (current.error) {
        return reply(
          response,
          { name: 'application_error', message: 'Test failure' },
          500
        )
      }
      reply(
        response,
        batch
          ? { data: emails.map(() => ({ id: randomUUID() })) }
          : { id: randomUUID() }
      )
      log?.('Mock Resend response sent (200)')
    } catch (error) {
      log?.('Catcher failed:', error.message)
      if (!response.headersSent) {
        reply(
          response,
          { name: 'application_error', message: 'Local catcher failed' },
          500
        )
      } else {
        response.destroy()
      }
    }
  })

  return {
    server,
    getRequests: () => structuredClone(requests),
    reset() {
      requests = []
      options = { error: false, delayMs: 0 }
    },
    configure(settings) {
      if (settings.error !== undefined && typeof settings.error !== 'boolean') {
        throw new TypeError('error must be a boolean')
      }
      if (
        settings.delayMs !== undefined &&
        (!Number.isFinite(settings.delayMs) || settings.delayMs < 0)
      ) {
        throw new TypeError('delayMs must be a non-negative finite number')
      }
      options = { ...options, ...settings }
    },
  }
}
