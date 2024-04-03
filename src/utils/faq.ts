import { faqsQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { cache } from 'react'

export const getFAQs = cache(async () => {
  const faqsFromCMS = await runQuery(faqsQuery)

  if (faqsFromCMS) {
    return faqsFromCMS.map((faq) => {
      return {
        _id: faq._id,
        question: faq.question ?? 'Keine Frage',
        answer: faq.answerStyled ?? 'Keine Antwort',
      } as const
    })
  }
})
