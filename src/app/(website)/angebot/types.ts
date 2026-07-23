import { InferType } from 'groqd'
import { serviceBySlugQuery, servicesQuery } from '@/sanity/lib/queries'

export type ServiceQueryData = InferType<typeof servicesQuery>[number]
