'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { type ReactNode, useEffect, useId, useState } from 'react'
import { FiCalendar, FiLock } from 'react-icons/fi'
import Heading from '@/components/heading'
import Button from '@/components/ui/button'
import { cn } from '@/utils/cn'

export default function CalBooking({
  calLink,
  namespace,
  title,
  description,
  hint,
  dark = false,
}: {
  calLink: string
  namespace: string
  title: string
  description?: ReactNode
  hint?: string
  dark?: boolean
}) {
  // Cal.com wird erst nach Klick geladen (Datenschutz, keine Drittanbieter-Requests vorab)
  const [enabled, setEnabled] = useState(false)
  const calendarId = useId()

  useEffect(() => {
    if (!enabled) return
    ;(async () => {
      const cal = await getCalApi({ namespace })
      window.Cal.config = window.Cal.config || {}
      window.Cal.config.forwardQueryParams = true
      cal('ui', {
        theme: 'light',
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
  }, [enabled, namespace])

  return (
    <>
      <div className="col-left max-w-2xl lg:mt-6">
        <Heading level={2} size={3} className="pb-5">
          {title}
        </Heading>

        {description}
        {hint && (
          <p
            className={cn(
              'mt-7 flex items-center gap-2 text-sm',
              dark ? 'text-base-white/75' : 'text-primary/75'
            )}
          >
            <FiLock
              aria-hidden="true"
              className={cn(
                'shrink-0',
                dark ? 'text-secondary' : 'text-primary'
              )}
            />
            {hint}
          </p>
        )}
      </div>
      <div className="col-right max-lg:mt-4">
        <div
          id={calendarId}
          role="region"
          aria-label="Terminkalender"
          className={cn(
            'relative min-h-[600px] w-full min-w-0 overflow-hidden rounded-lg',
            // Vor dem Laden braucht der Platzhalter auf blauem Hintergrund eine helle Fläche
            dark && !enabled && 'bg-base-white text-primary'
          )}
        >
          {enabled ? (
            <Cal
              namespace={namespace}
              calLink={calLink}
              style={{ width: '100%', minHeight: '600px', overflow: 'auto' }}
              config={{
                layout: 'month_view',
                theme: 'light',
                useSlotsViewOnSmallScreen: 'true',
              }}
            />
          ) : (
            <>
              <div
                aria-hidden="true"
                className="absolute inset-0 grid min-h-[600px] grid-cols-12 gap-4 p-6 opacity-35 sm:gap-6 sm:p-8"
              >
                <div className="col-span-4 hidden flex-col justify-between border-r border-primary/10 pr-4 md:flex">
                  <div>
                    <div className="mb-4 size-10 rounded-full bg-primary/15" />
                    <div className="mb-2 h-3 w-2/3 rounded bg-primary/15" />
                    <div className="mb-3 h-5 w-full rounded bg-primary/15" />
                    <div className="h-3 w-5/6 rounded bg-primary/10" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 w-1/2 rounded bg-primary/10" />
                    <div className="h-3 w-2/3 rounded bg-primary/10" />
                    <div className="h-3 w-1/2 rounded bg-primary/10" />
                  </div>
                </div>
                <div className="col-span-12 flex flex-col justify-between md:col-span-5">
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <div className="h-4 w-2/5 rounded bg-primary/15" />
                      <div className="h-5 w-12 rounded bg-primary/10" />
                    </div>
                    <div className="mb-4 grid grid-cols-7 gap-2">
                      {Array.from({ length: 7 }, (_, index) => (
                        <span
                          key={`weekday-${index}`}
                          className="mx-auto h-2 w-3 rounded bg-primary/10"
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 35 }, (_, index) => (
                        <span
                          key={`day-${index}`}
                          className={`aspect-square rounded-md ${index === 24 ? 'bg-primary/25' : 'bg-primary/10'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="h-3 w-1/3 rounded bg-primary/10" />
                </div>
                <div className="col-span-3 hidden border-l border-primary/10 pl-4 pt-2 md:block">
                  <div className="mb-5 h-4 w-2/3 rounded bg-primary/15" />
                  <div className="space-y-3">
                    {Array.from({ length: 5 }, (_, index) => (
                      <div
                        key={`slot-${index}`}
                        className="h-10 rounded-md border border-primary/10 bg-base-white/60"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 z-10 flex items-center justify-center p-5 backdrop-blur-[2px] sm:p-8">
                <div className="w-full max-w-md rounded-lg border border-primary/10 bg-base-white p-6 text-center shadow-xl sm:p-8">
                  <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FiCalendar aria-hidden="true" className="size-7" />
                  </span>
                  <h3 className="mb-2 text-xl font-semibold">
                    Termin direkt buchen
                  </h3>
                  <p className="mb-6 text-sm text-primary/75">
                    Beim Laden des Kalenders werden Daten wie deine IP-Adresse
                    an Cal.com übertragen.
                  </p>
                  <Button
                    type="button"
                    intent="secondary"
                    onClick={() => setEnabled(true)}
                    aria-controls={calendarId}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg"
                  >
                    <FiCalendar aria-hidden="true" />
                    Kalender laden und Termin wählen
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
