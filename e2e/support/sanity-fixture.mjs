// A small CMS response for the real /angebot/chatbots route. Keep the signup
// module available even when editors change the production page in Sanity.
export const chatbotService = {
  _id: 'e2e-chatbots',
  _createdAt: '2026-01-01T00:00:00Z',
  _updatedAt: '2026-01-01T00:00:00Z',
  slug: 'chatbots',
  breadcrumb: 'Chatbots',
  subPageOf: null,
  header: {
    title: [
      {
        _type: 'block',
        _key: 'title',
        style: 'normal',
        markDefs: [],
        children: [
          { _type: 'span', _key: 'text', marks: [], text: 'Apptiva Klar' },
        ],
      },
    ],
    lead: 'Teste unseren Chatbot.',
    image: null,
    meta: null,
  },
  modules: [
    {
      _key: 'test-chatbot',
      type: 'test-chatbot',
      title: '30 Tage kostenlos testen',
      image: null,
      cards: null,
      projects: null,
      faqs: null,
      prices: null,
      persons: [],
      servicePageTeaser: null,
      documents: null,
    },
  ],
  authors: [],
  callToAction: null,
  products: null,
}
