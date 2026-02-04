import portableTextToString from '@/utils/portable-text-to-string'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'service-page',
  title: 'Service Pages',
  type: 'document',
  groups: [
    {
      name: 'teaser',
      title: 'Teaser',
    },
    {
      name: 'product',
      title: 'Product Schema',
    },
  ],
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'header',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (document: any) => portableTextToString(document.header.title),
        maxLength: 96,
      },
    }),
    defineField({
      name: 'breadcrumb',
      title: 'Breadcrumb',
      type: 'string',
    }),
    defineField({
      name: 'subPageOf',
      title: 'Unterseite von',
      type: 'reference',
      // @ts-ignore
      to: [defineArrayMember({ type: 'service-page' })],
    }),
    defineField({
      name: 'teaserTitle',
      title: 'Teaser Titel',
      type: 'string',
      group: 'teaser',
    }),
    defineField({
      name: 'illustration',
      title: 'Illustration',
      type: 'imageWithAlt',
      group: 'teaser',
    }),
    defineField({
      name: 'teaser',
      title: 'Teaser',
      type: 'array',
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
      group: 'teaser',
    }),
    defineField({
      name: 'modules',
      title: 'Module',
      type: 'array',
      // @ts-ignore
      of: [defineArrayMember({ type: 'module' })],
    }),
    defineField({
      name: 'callToAction',
      title: 'Call To Action',
      type: 'link',
    }),
    defineField({
      name: 'isProduct',
      title: 'Als Produkt markieren',
      type: 'boolean',
      description: 'Aktivieren um Product Schema Markup hinzuzufügen',
      group: 'product',
      initialValue: false,
    }),
    defineField({
      name: 'products',
      title: 'Produkte',
      type: 'array',
      description: 'Liste der Produkt-Varianten (z.B. verschiedene Pakete)',
      group: 'product',
      hidden: ({ document }) => !document?.isProduct,
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Produktname',
              type: 'string',
              description: 'Name des Produkts/Pakets',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Produktbeschreibung',
              type: 'text',
              rows: 3,
              description: 'Kurze Beschreibung des Produkts',
            },
            {
              name: 'price',
              title: 'Preis',
              type: 'number',
              description: 'Preis in der angegebenen Währung',
              validation: (Rule) => Rule.required().positive(),
            },
            {
              name: 'priceCurrency',
              title: 'Währung',
              type: 'string',
              description: 'ISO 4217 Währungscode',
              initialValue: 'CHF',
            },
            {
              name: 'priceValidUntil',
              title: 'Preis gültig bis',
              type: 'date',
              description: 'Optionales Datum bis wann der Preis gültig ist',
              options: {
                dateFormat: 'DD.MM.YYYY',
              },
            },
          ],
          preview: {
            select: {
              title: 'name',
              price: 'price',
              currency: 'priceCurrency',
            },
            prepare({ title, price, currency }) {
              return {
                title: title || 'Unbenanntes Produkt',
                subtitle: price ? `${currency} ${price}` : 'Kein Preis',
              }
            },
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Title',
      name: 'title',
      by: [
        {
          field: 'header.title[0].children[0].text',
          direction: 'asc',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'header.title',
      breadcrumb: 'breadcrumb',
    },
    prepare(selection) {
      return {
        title: selection.breadcrumb || portableTextToString(selection.title),
        subtitle: selection.breadcrumb
          ? portableTextToString(selection.title)
          : undefined,
      }
    },
  },
})
