import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'meta',
  title: 'Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      description: '60 Zeichen',
      type: 'string',
      validation: (Rule) =>
        Rule.max(60).warning(
          `Der Titel sollte nicht länger als 60 Zeichen sein.`
        ),
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      description: '160 Zeichen',
      type: 'string',
      validation: (Rule) =>
        Rule.max(160).warning(
          `Die Beschreibung sollte nicht länger als 160 Zeichen sein.`
        ),
    }),
  ],
})
