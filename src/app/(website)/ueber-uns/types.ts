import type { InferResultType } from 'groqd'
import { aboutPageQuery } from '@/sanity/lib/queries'

export type AboutPageQueryData = InferResultType<typeof aboutPageQuery>
