import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'doc',
  title: 'Dokument',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 3,
      description: 'Kurze Beschreibung oder Zusammenfassung des Dokuments.',
    }),
    defineField({
      name: 'file',
      title: 'PDF-Dokument',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      description: 'Das eigentliche PDF-Dokument.',
    }),
    defineField({
      name: 'externalLink',
      title: 'Externer Link',
      type: 'url',
      description:
        'Optionaler Link zur Originalquelle oder weiterführenden Infos.',
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      description: 'Optional: Vorschaubild oder Logo zum Dokument.',
      options: {
        hotspot: true,
      },
    }),
  ],
})
