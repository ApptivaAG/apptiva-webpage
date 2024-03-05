import { settingsQuery } from '@/sanity/lib/queries'
import { InferType } from 'groqd'

export type SettingsData = InferType<typeof settingsQuery>[number]
