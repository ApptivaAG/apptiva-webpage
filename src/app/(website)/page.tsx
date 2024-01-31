// ./nextjs-app/app/page.tsx

import Heading from '@/components/heading'

export default async function Home() {
  return (
    <div className="container mx-auto px-4">
      <Heading level={2}>Apptiva</Heading>
    </div>
  )
}
