import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) =>
        Rule.max(60).warning(
          `Der Titel sollte nicht länger als 60 Zeichen sein.`
        ),
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'string',
      validation: (Rule) =>
        Rule.max(160).warning(
          `Die Beschreibung sollte nicht länger als 160 Zeichen sein.`
        ),
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
  ],
})
