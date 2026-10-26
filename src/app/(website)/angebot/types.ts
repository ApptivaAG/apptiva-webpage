import type { InferResultType } from 'groqd'
import { serviceBySlugQuery, servicesQuery } from '@/sanity/lib/queries'

export type ServiceQueryData = InferResultType<typeof servicesQuery>[number]
