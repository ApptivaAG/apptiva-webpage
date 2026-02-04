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
      name: 'productName',
      title: 'Produktname',
      type: 'string',
      description: 'Name des Produkts (falls abweichend vom Titel)',
      group: 'product',
      hidden: ({ document }) => !document?.isProduct,
    }),
    defineField({
      name: 'productDescription',
      title: 'Produktbeschreibung',
      type: 'text',
      rows: 3,
      description: 'Kurze Beschreibung des Produkts für Schema.org',
      group: 'product',
      hidden: ({ document }) => !document?.isProduct,
    }),
    defineField({
      name: 'price',
      title: 'Preis',
      type: 'number',
      description: 'Preis in der angegebenen Währung (z.B. 99.00)',
      group: 'product',
      hidden: ({ document }) => !document?.isProduct,
    }),
    defineField({
      name: 'priceCurrency',
      title: 'Währung',
      type: 'string',
      description: 'ISO 4217 Währungscode (z.B. CHF, EUR, USD)',
      initialValue: 'CHF',
      group: 'product',
      hidden: ({ document }) => !document?.isProduct,
    }),
    defineField({
      name: 'priceValidUntil',
      title: 'Preis gültig bis',
      type: 'date',
      description: 'Optionales Datum bis wann der Preis gültig ist',
      group: 'product',
      hidden: ({ document }) => !document?.isProduct,
    }),
    defineField({
      name: 'availability',
      title: 'Verfügbarkeit',
      type: 'string',
      options: {
        list: [
          { title: 'Auf Lager', value: 'InStock' },
          { title: 'Nicht vorrätig', value: 'OutOfStock' },
          { title: 'Vorbestellung', value: 'PreOrder' },
          { title: 'Begrenzte Verfügbarkeit', value: 'LimitedAvailability' },
          { title: 'Online verfügbar', value: 'OnlineOnly' },
        ],
      },
      initialValue: 'InStock',
      group: 'product',
      hidden: ({ document }) => !document?.isProduct,
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
