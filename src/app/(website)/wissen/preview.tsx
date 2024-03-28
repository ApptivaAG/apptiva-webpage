'use client'

import {
  FAQQueryData,
  GlossaryQueryData,
  faqsQuery,
  glossaryQuery,
} from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import FAQ from './faq'
import Glossar from './glossary'

export default function KnowledgePreview(props: {
  initialFAQs: QueryResponseInitial<FAQQueryData>
  initialGlossar: QueryResponseInitial<GlossaryQueryData>
}) {
  const { data: faqData } = useQuery<FAQQueryData>(faqsQuery.query, undefined, {
    initial: props.initialFAQs,
  })
  const { data: glossaryData } = useQuery<GlossaryQueryData>(
    glossaryQuery.query,
    undefined,
    {
      initial: props.initialGlossar,
    }
  )

  return (
    <>
      <FAQ data={faqData} />
      <Glossar data={glossaryData} />
    </>
  )
}
