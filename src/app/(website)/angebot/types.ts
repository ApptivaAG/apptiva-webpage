import { serviceBySlugQuery, servicesQuery } from '@/sanity/lib/queries'
import { InferType } from 'groqd'

export type ServiceQueryData = InferType<typeof servicesQuery>[number]
