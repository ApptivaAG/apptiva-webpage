import { stegaEncodeSourceMap } from '@sanity/client/stega'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PageHeader } from '../page-header'

vi.mock('@/components/chat-input', () => ({ default: () => null }))
vi.mock('@/components/sanity-image', () => ({ default: () => null }))

const draftBreadcrumb = stegaEncodeSourceMap(
  { breadcrumb: 'Chatbots' },
  {
    documents: [{ _id: 'drafts.chatbots', _type: 'service-page' }],
    paths: ["$['breadcrumb']"],
    mappings: {
      "$['breadcrumb']": {
        type: 'value',
        source: { type: 'documentValue', document: 0, path: 0 },
      },
    },
  },
  { enabled: true, studioUrl: '/studio' }
).breadcrumb

describe('PageHeader trust elements', () => {
  it('shows CMS trust elements with a stega-encoded chatbot breadcrumb', () => {
    render(
      <PageHeader
        title="Chatbots"
        lead="Einleitung"
        links={[{ name: draftBreadcrumb }]}
        trustElements={['Schweizer Hosting']}
      />
    )

    expect(screen.queryByText('Schweizer Hosting')).not.toBeNull()
  })

  it('shows CMS trust elements with a published chatbot breadcrumb', () => {
    render(
      <PageHeader
        title="Chatbots"
        lead="Einleitung"
        links={[{ name: 'Chatbots' }]}
        trustElements={['Schweizer Hosting']}
      />
    )

    expect(screen.queryByText('Schweizer Hosting')).not.toBeNull()
  })

  it('shows no trust elements when none are provided', () => {
    const { container } = render(
      <PageHeader
        title="Chatbots"
        lead="Einleitung"
        links={[{ name: draftBreadcrumb }]}
      />
    )

    expect(container.querySelector('header ul')).toBeNull()
  })

  it('does not show trust elements outside the chatbot area', () => {
    render(
      <PageHeader
        title="Software"
        lead="Einleitung"
        links={[{ name: 'Softwareentwicklung' }]}
        trustElements={['Schweizer Hosting']}
      />
    )

    expect(screen.queryByText('Schweizer Hosting')).toBeNull()
  })
})
