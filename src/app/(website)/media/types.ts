import { InferType } from 'groqd'
import { mediaPageQuery } from '@/sanity/lib/queries'

export type MediaPageQueryData = InferType<typeof mediaPageQuery>
