import Heading from '@/components/heading'
import { getServicePages } from '@/utils/service-page'
import Link from 'next/link'

export default async function Home() {
  const servicePages = await getServicePages()

  return (
    <div>
      <Heading level={2}>Angebot</Heading>
      <ul>
        {Array.from(servicePages.values()).map((servicePage) => (
          <li key={servicePage.slug}>
            <Link href={'angebot/' + servicePage.slug}>
              {servicePage.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
