'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { disableDraftMode } from '@/app/(cms)/actions'
import { useIsPresentationTool } from 'next-sanity/hooks'

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  // Only show the disable draft mode button when outsde of Presentation Tool
  if (isPresentationTool) {
    return null
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode()
      router.refresh()
    })

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {pending ? (
        <div className="text-white primary-light rounded-lg bg-secondary-dark px-3 py-2 shadow-lg">
          Disabling draft mode...
        </div>
      ) : (
        <button
          type="button"
          onClick={disable}
          className="text-white rounded-lg bg-secondary px-4 py-2 shadow-lg transition-colors"
        >
          Disable draft mode
        </button>
      )}
    </div>
  )
}
