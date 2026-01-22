import { mediaPageQuery } from '@/sanity/lib/queries'
import { InferType } from 'groqd'

export type MediaPageQueryData = InferType<typeof mediaPageQuery>
