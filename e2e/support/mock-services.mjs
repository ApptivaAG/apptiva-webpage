import { setTimeout } from 'node:timers/promises'
import { createResendCatcher } from '../../script/lib/resend-catcher.mjs'

let options
let calls
const catcher = createResendCatcher({
  handleOtherRequest: handleServiceRequest,
})

function reset() {
  options = {
    newsletterStatus: 'subscribed',
    newsletterError: false,
    spam: false,
    delayMs: 0,
  }
  calls = { mailchimp: [], spam: [], analytics: [], unexpected: [] }
  catcher.reset()
}

reset()

async function handleServiceRequest(request, response) {
  const reply = (body, status = 200) => {
    response.writeHead(status, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(body))
  }

  try {
    const pathname = new URL(request.url, 'http://127.0.0.1').pathname
    if (request.method === 'GET' && pathname === '/health')
      return reply({ ok: true })
    if (request.method === 'GET' && pathname === '/calls') {
      return reply({ ...calls, resend: catcher.getRequests() })
    }
    if (request.method !== 'POST') return reply({ error: 'Not found' }, 404)

    const chunks = []
    for await (const chunk of request) chunks.push(chunk)
    const body = JSON.parse(Buffer.concat(chunks).toString() || '{}')

    if (pathname === '/reset') {
      reset()
      return reply({ ok: true })
    }
    if (pathname === '/options') {
      const settings = {}
      if (body.resendError !== undefined) settings.error = body.resendError
      if (body.delayMs !== undefined) settings.delayMs = body.delayMs
      catcher.configure(settings)
      Object.assign(options, body)
      return reply(options)
    }

    const service = pathname.slice(1)
    if (!Object.hasOwn(calls, service))
      return reply({ error: 'Not found' }, 404)
    calls[service].push(body)
    const current = { ...options }

    if (service === 'unexpected') return reply({ ok: true })
    if (service === 'analytics') return reply({ ok: true })
    if (service === 'spam') {
      return reply({
        answers: {
          bot: { type: 'noul', noul: current.spam ? 0.99 : 0.01 },
          gibberish: { type: 'noul', noul: 0.01 },
        },
      })
    }

    await setTimeout(current.delayMs)
    if (current.newsletterError) {
      return reply(
        { title: 'Test failure', status: 500, detail: 'Try again' },
        500
      )
    }
    return reply({
      email_address: body.body.email_address,
      status: current.newsletterStatus,
    })
  } catch (error) {
    console.error(error)
    reply({ error: 'Mock service failed' }, 500)
  }
}

catcher.server.listen(3101, '127.0.0.1', () => {
  console.log('E2E mock services listening on http://127.0.0.1:3101')
})
