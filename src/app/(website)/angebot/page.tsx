import { getServicePages } from '@/utils/service-page'

export default async function Home() {
  const servicePages = await getServicePages()

  return (
    <div>
      <h1>Angebot</h1>
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
