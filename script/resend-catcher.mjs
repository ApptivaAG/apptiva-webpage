#!/usr/bin/env node
import { createServer } from 'node:http'
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CAPTURED_DIR = resolve(__dirname, '..', 'captured')
const PORT = 3999

if (!existsSync(CAPTURED_DIR)) {
  mkdirSync(CAPTURED_DIR, { recursive: true })
}

const RESEND_LABEL = '\x1b[36m[resend-catcher]\x1b[0m'
const OK_LABEL = '\x1b[32mOK\x1b[0m'

function bold(s) {
  return `\x1b[1m${s}\x1b[0m`
}

function dim(s) {
  return `\x1b[2m${s}\x1b[0m`
}

function yellow(s) {
  return `\x1b[33m${s}\x1b[0m`
}

function log(...args) {
  console.log(RESEND_LABEL, ...args)
}

function redactAuth(headers) {
  const h = { ...headers }
  if (h.authorization) {
    h.authorization = h.authorization.replace(/(Bearer\s+)(.+)/, (_, pre) => pre + 're_***')
  }
  return h
}

function formatJson(obj) {
  return JSON.stringify(obj, null, 2)
}

function inferKind(emails) {
  for (const email of emails) {
    if (email.to === 'bubble-chat@apptiva.ch') return 'bubble'
    if (email.to === 'info@apptiva.ch') return 'apptiva'
  }
  const subject = emails[0]?.subject || 'unknown'
  return subject.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 40)
}

function captureRequest(method, url, headers, body, kind) {
  const snapshot = {
    receivedAt: new Date().toISOString(),
    method,
    path: url,
    headers: redactAuth(headers),
    body,
  }

  const dir = resolve(CAPTURED_DIR, kind)
  mkdirSync(dir, { recursive: true })

  writeFileSync(resolve(dir, 'request.json'), formatJson(snapshot) + '\n')

  if (Array.isArray(body)) {
    body.forEach((item, i) => {
      const html = item.html
      if (html) {
        writeFileSync(resolve(dir, `email-${i + 1}.html`), html)
      }
    })
  }

  return dir
}

function mockBatchResponse(count) {
  return {
    data: Array.from({ length: count }, () => ({ id: randomUUID() })),
  }
}

function mockSingleResponse() {
  return { data: { id: randomUUID() } }
}

const server = createServer((req, res) => {
  const { method, url, headers } = req
  const isEmailEndpoint = url === '/emails' || url === '/emails/batch'

  if (method !== 'POST' || !isEmailEndpoint) {
    log(yellow(`Ignored ${method} ${url}`))
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Only POST /emails and POST /emails/batch are supported' }))
    return
  }

  let rawBody = ''
  req.on('data', (chunk) => { rawBody += chunk })
  req.on('end', () => {
    let body
    try {
      body = JSON.parse(rawBody)
    } catch {
      log(yellow('Invalid JSON body received'))
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Invalid JSON' }))
      return
    }

    const emails = Array.isArray(body) ? body : [body]
    const kind = inferKind(emails)

    log('')
    log(bold('=== Captured Resend Request ==='))
    log(`${bold('Kind:')}    ${kind}`)
    log(`${bold('Method:')}  ${method}`)
    log(`${bold('Path:')}    ${url}`)
    log(`${bold('Headers:')}`)
    log(headers.authorization ? `  authorization: ${headers.authorization}` : '  (no auth)')
    if (headers['user-agent']) log(`  user-agent: ${headers['user-agent']}`)
    if (headers['content-type']) log(`  content-type: ${headers['content-type']}`)
    log(`${bold('Body:')}    ${isArray(body) ? `batch of ${body.length} email(s)` : 'single email'}`)

    emails.forEach((email, i) => {
      log('')
      log(dim(`--- Email ${i + 1} ---`))
      log(`  ${bold('from:')}    ${email.from}`)
      log(`  ${bold('to:')}      ${email.to}`)
      log(`  ${bold('subject:')} ${email.subject}`)
      log(`  ${bold('html:')}    ${email.html ? email.html.substring(0, 120) + '...' : '(react template, pre-render)'}`)
      if (email.react) {
        log(`  ${bold('react:')}   <React component>`)
      }
    })

    log('')

    captureRequest(method, url, headers, emails, kind)
    log(`${OK_LABEL} → ${bold(`captured/${kind}/`)}`)
    log(`${OK_LABEL}   request.json`)
    emails.forEach((_, i) => {
      log(`${OK_LABEL}   email-${i + 1}.html`)
    })

    const responseBody = isArray(body)
      ? mockBatchResponse(body.length)
      : mockSingleResponse()

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(responseBody) + '\n')
    log(`${OK_LABEL} Mock Resend response sent (200)\n`)
  })
})

server.listen(PORT, () => {
  log(bold(`Catcher listening on http://localhost:${PORT}`))
  log(dim('Set RESEND_BASE_URL=http://localhost:3999 to intercept Resend calls'))
  log(dim('Press Ctrl+C to stop'))
})

function isArray(v) {
  return Array.isArray(v)
}
