import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'authorProfile',
  title: 'Autorenprofil',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Autorenprofil anzeigen',
      description:
        'Veröffentlicht das Profil unter /autoren/{Slug} und verlinkt es im Team und bei Blogbeiträgen.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'headline',
      title: 'Berufsbezeichnung / Qualifikationen',
      type: 'string',
    }),
    defineField({
      name: 'introduction',
      title: 'Kurzvorstellung',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'summary',
      title: 'Kurztext für die Autorenbox',
      description:
        'Erscheint unter Blogposts und Service Pages. Ohne eigenen Kurztext wird die Kurzvorstellung verwendet.',
      type: 'text',
      rows: 4,
    }),
    defineField({ name: 'meta', title: 'Suchmaschinen', type: 'meta' }),
    defineField({
      name: 'sections',
      title: 'Profilabschnitte',
      description:
        'Die Reihenfolge hier bestimmt die Reihenfolge auf der Profilseite. Leere Abschnitte werden ausgeblendet.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'profileSection',
          title: 'Profilabschnitt',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Bereich, z. B. Über mich',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Überschrift',
              type: 'string',
            }),
            defineField({
              name: 'layout',
              title: 'Darstellung',
              type: 'string',
              initialValue: 'text',
              options: {
                list: [
                  { title: 'Fliesstext', value: 'text' },
                  { title: 'Kompetenzen / Karten', value: 'cards' },
                  { title: 'Kennzahlen', value: 'stats' },
                  { title: 'Werdegang', value: 'timeline' },
                  { title: 'Projekte / Publikationen', value: 'features' },
                  { title: 'Kundenstimmen', value: 'quotes' },
                  { title: 'Grundsätze', value: 'principles' },
                ],
              },
            }),
            defineField({
              name: 'content',
              title: 'Einleitung / Text',
              type: 'array',
              of: [defineArrayMember({ type: 'block' })],
            }),
            defineField({
              name: 'entries',
              title: 'Einträge',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'profileEntry',
                  title: 'Eintrag',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Titel / Kennzahl',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'subtitle',
                      title: 'Zeitraum / Quelle / Bezeichnung',
                      type: 'string',
                    }),
                    defineField({
                      name: 'content',
                      title: 'Beschreibung / Zitat',
                      type: 'array',
                      of: [defineArrayMember({ type: 'block' })],
                    }),
                    defineField({
                      name: 'href',
                      title: 'Link',
                      type: 'url',
                      validation: (rule) =>
                        rule.uri({
                          allowRelative: true,
                          scheme: ['http', 'https'],
                        }),
                    }),
                    defineField({
                      name: 'linkText',
                      title: 'Linktext',
                      type: 'string',
                    }),
                  ],
                  preview: { select: { title: 'title', subtitle: 'subtitle' } },
                }),
              ],
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'title' } },
        }),
      ],
    }),
    defineField({
      name: 'articlesTitle',
      title: 'Überschrift Fachbeiträge',
      type: 'string',
    }),
    defineField({
      name: 'articlesIntroduction',
      title: 'Einleitung Fachbeiträge',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'contactTitle',
      title: 'Überschrift Kontakt',
      type: 'string',
    }),
    defineField({
      name: 'contactIntroduction',
      title: 'Einleitung Kontakt',
      type: 'text',
      rows: 4,
    }),
  ],
})
