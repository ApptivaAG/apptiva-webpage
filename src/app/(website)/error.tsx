'use client'

import Heading from '@/components/heading'
import Button from '@/components/ui/button'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="space-y-24 py-8">
      <div className="space-y-4">
        <Heading level={1} size={3} className="text-primary">
          Da ist etwas schiefgelaufen!
        </Heading>
        <div className="flex flex-wrap gap-3">
          <Button>
            <Link href="/">Zur Startseite</Link>
          </Button>
          <Button intent="ghost" onClick={() => reset()}>
            Nochmals versuchen
          </Button>
        </div>
      </div>

      <div>
        {error.message && (
          <div className="text-sm opacity-30">
            <p>Fehlermeldung</p>
            <pre>{error.message}</pre>
          </div>
        )}
        <pre className="opacity-30">{error.digest}</pre>
      </div>
    </div>
  )
}
