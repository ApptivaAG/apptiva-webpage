import type { InferResultType } from 'groqd'
import { mediaPageQuery } from '@/sanity/lib/queries'

export type MediaPageQueryData = InferResultType<typeof mediaPageQuery>
