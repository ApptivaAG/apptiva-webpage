import StatusSwitch from '@/sanity/components/active-switch'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'customer',
  title: 'Kunde',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'customerName',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'priority',
      title: 'Priorität',
      description: 'Höhere Nummer kommt früher im Kundenband',
      type: 'number',
    }),
    defineField({
      name: 'logo',
      description: 'Bevorzugt SVG, sonst PNG.',
      title: 'Logo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'logoHeight',
      title: 'Darstellungsgrösse in Pixel',
      description:
        'Wie hoch soll das Logo im Logoband angezeigt werden. Normalerweise zwischen 30 bis 140.',
      type: 'number',
    }),
    defineField({
      title: 'Link zur Kundenwebseite',
      name: 'href',
      type: 'url',
    }),
    defineField({
      name: 'content',
      title: 'Über den Kunden',
      description:
        'Text über den Kunden und was die Beziehung zur Apptiva ist.',
      type: 'array',
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description:
        'Tags in welchen Bereichen wir eine Beziehung zum Kunden haben.',
      type: 'array',
      // @ts-ignore
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
        },
      ],
    }),
    defineField({
      name: 'active',
      title: 'Status',
      type: 'boolean',
      initialValue: true,
      components: {
        input: StatusSwitch,
      },
    }),
  ],
})
