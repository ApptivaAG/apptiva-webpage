import Heading from '@/components/heading'
import { getServicePages } from '@/utils/service-page'

export default async function Home() {
  const servicePages = await getServicePages()

  return (
    <div>
      <Heading level={2}>Angebot</Heading>
      <ul>
        {Array.from(servicePages.values()).map((servicePage) => (
          <li key={servicePage.slug}>
            <a href={'angebot/' + servicePage.slug}>{servicePage.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
