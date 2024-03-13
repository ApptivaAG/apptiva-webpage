'use client'

import Heading from '@/components/heading'
import Button from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="space-y-8 py-8">
      <Heading level={1} size={3}>
        Da ist etwas schiefgelaufen!
      </Heading>
      <Button onClick={() => reset()}>Nochmals versuchen</Button>

      <pre className="opacity-50">{error.digest}</pre>
      {error.message && (
        <div>
          <p>Fehlermeldung</p>
          <pre className="opacity-50">{error.message}</pre>
        </div>
      )}
    </div>
  )
}
