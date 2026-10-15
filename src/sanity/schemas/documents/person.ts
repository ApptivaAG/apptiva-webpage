import { defineArrayMember, defineField, defineType } from 'sanity'
import StatusSwitch from '@/sanity/components/active-switch'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  groups: [
    { name: 'person', title: 'Person', default: true },
    { name: 'profile', title: 'Autorenprofil' },
  ],
  fields: [
    defineField({
      name: 'active',
      title: 'Status',
      type: 'boolean',
      initialValue: true,
      components: {
        input: StatusSwitch,
      },
    }),
    defineField({
      name: 'personName',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'personName',
        maxLength: 96,
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          const profile = context.document?.authorProfile as
            | { enabled?: boolean }
            | undefined
          return !profile?.enabled || value?.current
            ? true
            : 'Ein Autorenprofil benötigt einen Slug.'
        }),
    }),
    defineField({
      name: 'role',
      title: 'Rolle',
      type: 'string',
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'string',
    }),
    defineField({
      name: 'claim',
      title: 'Claim',
      type: 'string',
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Text',
      type: 'array',
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
    defineField({
      title: 'Kontakt',
      name: 'contact',
      type: 'contact',
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'imageWithoutBackground',
      title: 'Bild ohne Hintergrund',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'authorProfile',
      title: 'Autorenprofil',
      type: 'authorProfile',
      group: 'profile',
    }),
    defineField({
      title: 'Skills',
      name: 'skills',
      type: 'array',
      // @ts-ignore
      of: [defineArrayMember({ type: 'skill' })],
    }),
  ].map((field) => ({
    ...field,
    group: field.name === 'authorProfile' ? 'profile' : 'person',
  })),
})
