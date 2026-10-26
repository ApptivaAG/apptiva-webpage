import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { setTimeout } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { Resend } from 'resend'
import { createResendCatcher } from '../lib/resend-catcher.mjs'

const email = {
  from: 'Contact <contact@example.com>',
  to: 'alex@example.com',
  subject: 'Contact request',
  html: '<html><body><p>Hello Alex</p></body></html>',
}

async function start(t, options) {
  const catcher = createResendCatcher(options)
  assert.equal(catcher.server.listening, false)
  t.after(
    () =>
      new Promise((resolve, reject) => {
        catcher.server.close((error) => (error ? reject(error) : resolve()))
      })
  )
  catcher.server.listen(0, '127.0.0.1')
  await once(catcher.server, 'listening')
  const origin = `http://127.0.0.1:${catcher.server.address().port}`
  return {
    ...catcher,
    origin,
    client: new Resend('re_secret-test-key', { baseUrl: origin }),
    send: (path, body) =>
      fetch(`${origin}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }),
  }
}

async function temporaryDirectory(t) {
  const directory = await mkdtemp(join(tmpdir(), 'resend-catcher-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  return directory
}

test('captures actual SDK batch requests without modifying the rendered HTML', async (t) => {
  const logs = []
  const catcher = await start(t, {
    log: (...args) => logs.push(args.join(' ')),
  })
  const batch = [email, { ...email, to: ['klar@apptiva.ch'] }]
  const result = await catcher.client.batch.send(batch)

  assert.equal(result.error, null)
  assert.equal(result.data.data.length, 2)
  assert.equal(new Set(result.data.data.map(({ id }) => id)).size, 2)
  const [request] = catcher.getRequests()
  assert.equal(request.path, '/emails/batch')
  assert.equal(request.method, 'POST')
  assert.equal(request.kind, 'klar')
  assert.equal(request.headers.authorization, 'Bearer ***')
  assert.deepEqual(request.body, batch)
  assert.ok(logs.join('\n').includes('Bearer ***'))
  assert.ok(!logs.join('\n').includes('re_secret-test-key'))

  request.body[0].html = 'Changed by test'
  assert.equal(catcher.getRequests()[0].body[0].html, email.html)
})

test('returns the single-email response shape expected by the SDK', async (t) => {
  const catcher = await start(t)
  const result = await catcher.client.emails.send(email)
  assert.equal(result.error, null)
  assert.equal(typeof result.data.id, 'string')
  assert.equal(result.data.data, undefined)
  assert.deepEqual(catcher.getRequests()[0].body, email)

  const response = await catcher.send('/emails', email)
  assert.deepEqual(Object.keys(await response.json()), ['id'])
})

test('captures failed requests and exposes the error through the real SDK', async (t) => {
  const catcher = await start(t)
  catcher.configure({ error: true })
  const result = await catcher.client.batch.send([email])
  assert.equal(result.data, null)
  assert.equal(result.error.name, 'application_error')
  assert.equal(catcher.getRequests().length, 1)

  catcher.reset()
  assert.deepEqual(catcher.getRequests(), [])
  const retried = await catcher.client.batch.send([email])
  assert.equal(retried.error, null)
  assert.equal(catcher.getRequests().length, 1)
})

test('supports delayed responses for browser pending-state tests', async (t) => {
  const catcher = await start(t)
  catcher.configure({ delayMs: 100 })
  const started = performance.now()
  const response = await catcher.send('/emails', email)
  assert.equal(response.status, 200)
  assert.ok(performance.now() - started >= 90)
})

test('keeps the response settings of an in-flight request', async (t) => {
  const catcher = await start(t)
  catcher.configure({ delayMs: 100 })
  const pending = catcher.send('/emails', email)
  for (
    let attempt = 0;
    catcher.getRequests().length === 0 && attempt < 100;
    attempt++
  ) {
    await setTimeout(5)
  }
  assert.equal(catcher.getRequests().length, 1)
  catcher.configure({ error: true, delayMs: 0 })
  assert.equal((await pending).status, 200)
  assert.equal((await catcher.send('/emails', email)).status, 500)
})

test('isolates request captures and options between catcher instances', async (t) => {
  const first = await start(t)
  const second = await start(t)
  first.configure({ error: true })
  assert.equal((await first.send('/emails', email)).status, 500)
  assert.deepEqual(second.getRequests(), [])
  assert.equal((await second.send('/emails', email)).status, 200)
  first.reset()
  assert.equal(second.getRequests().length, 1)
})

test('writes optional manual snapshots with redacted headers and formatted HTML', async (t) => {
  const directory = await temporaryDirectory(t)
  const catcher = await start(t, { captureDir: directory })
  const internal = { ...email, to: ['info@apptiva.ch'] }
  await catcher.client.batch.send([email, internal])

  const raw = await readFile(join(directory, 'apptiva/request.json'), 'utf8')
  const snapshot = JSON.parse(raw)
  assert.equal(snapshot.headers.authorization, 'Bearer ***')
  assert.ok(!raw.includes('re_secret-test-key'))
  assert.deepEqual(snapshot.body, [email, internal])
  const html = await readFile(join(directory, 'apptiva/email-1.html'), 'utf8')
  assert.match(html, /<html>\n  <body>\n    <p>\n      Hello Alex/)
  assert.equal(catcher.getRequests()[0].body[0].html, email.html)
})

test('writes single-email captures and sanitizes fallback directory names', async (t) => {
  const directory = await temporaryDirectory(t)
  const catcher = await start(t, { captureDir: directory })
  const single = { ...email, subject: '../outside/path' }
  await catcher.send('/emails', single)
  const kind = catcher.getRequests()[0].kind
  assert.equal(kind, '___outside_path')
  const snapshot = JSON.parse(
    await readFile(join(directory, kind, 'request.json'), 'utf8')
  )
  assert.deepEqual(snapshot.body, [single])
  assert.ok(await readFile(join(directory, kind, 'email-1.html'), 'utf8'))
})

test('rejects malformed JSON and invalid single/batch bodies without capturing them', async (t) => {
  const catcher = await start(t)
  const invalidJson = await fetch(`${catcher.origin}/emails`, {
    method: 'POST',
    body: '{',
  })
  assert.equal(invalidJson.status, 400)
  for (const [path, body] of [
    ['/emails', [email]],
    ['/emails', null],
    ['/emails', 'text'],
    ['/emails/batch', email],
    ['/emails/batch', []],
    ['/emails/batch', [null]],
  ]) {
    assert.equal((await catcher.send(path, body)).status, 400)
  }
  assert.deepEqual(catcher.getRequests(), [])
})

test('rejects other routes and methods without capturing them', async (t) => {
  const catcher = await start(t)
  assert.equal((await fetch(`${catcher.origin}/emails`)).status, 405)
  assert.equal((await catcher.send('/unknown', email)).status, 404)
  assert.deepEqual(catcher.getRequests(), [])
})

test('validates configuration without changing existing settings', async (t) => {
  const catcher = await start(t)
  catcher.configure({ error: true })
  assert.throws(() => catcher.configure({ error: 'yes' }), TypeError)
  for (const delayMs of [-1, NaN, Infinity, '100']) {
    assert.throws(() => catcher.configure({ delayMs }), TypeError)
  }
  assert.equal((await catcher.send('/emails', email)).status, 500)
})

test('the CLI keeps manual captures, supports an isolated port, and redacts its output', async (t) => {
  const directory = await temporaryDirectory(t)
  const child = spawn(
    process.execPath,
    [fileURLToPath(new URL('../resend-catcher.mjs', import.meta.url))],
    {
      env: {
        ...process.env,
        RESEND_CATCHER_PORT: '0',
        RESEND_CAPTURE_DIR: directory,
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    }
  )
  const exited = once(child, 'exit')
  t.after(async () => {
    if (child.exitCode === null && child.signalCode === null)
      child.kill('SIGTERM')
    await exited
  })
  let output = ''
  child.stdout.on('data', (chunk) => {
    output += chunk
  })
  const origin = await new Promise((resolve, reject) => {
    child.on('error', reject)
    child.on('exit', (code) =>
      reject(new Error(`CLI exited before startup: ${code}`))
    )
    child.stdout.on('data', () => {
      const match = /Listening on (http:\/\/127\.0\.0\.1:\d+)/.exec(output)
      if (match) resolve(match[1])
    })
  })
  const client = new Resend('re_cli-secret', { baseUrl: origin })
  const result = await client.emails.send({ ...email, to: 'info@apptiva.ch' })
  assert.equal(result.error, null)
  const snapshot = await readFile(
    join(directory, 'apptiva/request.json'),
    'utf8'
  )
  assert.ok(snapshot.includes('Bearer ***'))
  assert.ok(!snapshot.includes('re_cli-secret'))
  child.kill('SIGTERM')
  const [code] = await exited
  assert.equal(code, 0)
  assert.ok(output.includes('Bearer ***'))
  assert.ok(!output.includes('re_cli-secret'))
})
