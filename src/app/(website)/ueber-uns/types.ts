import { InferType } from 'groqd'
import { aboutPageQuery } from '@/sanity/lib/queries'

export type AboutPageQueryData = InferType<typeof aboutPageQuery>
