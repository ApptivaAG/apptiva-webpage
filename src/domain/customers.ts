import { InferType, q } from 'groqd'
import path from 'path'
import { cache } from 'react'
import { Slug, sanityImageWithAlt, Tags } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'

type CustomerData = NonNullable<InferType<typeof Customers>>[number]
const Customers = q('*')
  .filterByType('customer')
  .filter()
  .order('coalesce(priority, -999999) desc')
  .grab$({
    _id: q.string(),
    customerName: q.string(),
    slug: Slug,
    logo: sanityImageWithAlt('logo'),
    logoHeight: q.number().optional(),
    tags: Tags,
    priority: q.number().optional(),
  })

export type Group =
  | 'Chatbots'
  | 'App Entwicklung'
  | 'Softwareentwicklung'
  | 'Webentwicklung'
export const getCustomerLogos = cache(async (group?: Group[] | undefined) => {
  const customers = await runQuery(Customers, undefined, ['customer'])

  if (!group || group.length === 0) return customers
  return customers.filter((customer) =>
    arraysHaveSameElement(group, customer.tags)
  )
})

function arraysHaveSameElement(
  arr1: string[],
  arr2: (string | undefined)[] | null
) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr2?.includes(arr1[i])) {
      return true
    }
  }
  return false
}
