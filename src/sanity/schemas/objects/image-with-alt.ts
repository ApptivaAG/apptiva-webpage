import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'imageWithAlt',
  title: 'Bild',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'alt',
      title: 'Bildbeschreibung',
      type: 'text',
      rows: 3,
      description:
        'Beschreibung des Bildes in 1 bis 2 Sätzen mit den wichtigsten Schlüsselwörtern (SEO-relevant).',
    },
  ],
})
