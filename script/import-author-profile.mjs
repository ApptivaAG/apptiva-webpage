// Preview: pnpm exec sanity exec script/import-author-profile.mjs --with-user-token
// Save a draft: pnpm exec sanity exec script/import-author-profile.mjs --with-user-token -- --apply
import { execFileSync } from 'node:child_process'
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-08' }).withConfig({ useCdn: false, perspective: 'raw' })
const source = JSON.parse(execFileSync('python', ['-c', `
import zipfile, xml.etree.ElementTree as E, json
z = zipfile.ZipFile('tmp/Autorenprofil.docx')
r = E.fromstring(z.read('word/document.xml'))
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
rels = {x.attrib['Id']: x.attrib.get('Target') for x in E.fromstring(z.read('word/_rels/document.xml.rels'))}
result = []
for p in r.findall('.//w:p', ns):
  text = ''.join(p.itertext()).strip()
  if not text: continue
  style = p.find('./w:pPr/w:pStyle', ns)
  links = [rels.get(h.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')) for h in p.findall('.//w:hyperlink', ns)]
  result.append({'text': text, 'style': style.attrib.get('{'+ns['w']+'}val', '') if style is not None else '', 'links': links})
print(json.dumps(result))
`], { encoding: 'utf8' }))

let key = 0
const blocks = (texts) => texts.map((text) => ({
  _type: 'block', _key: `block-${++key}`, style: 'normal', markDefs: [],
  children: [{ _type: 'span', _key: `span-${key}`, text, marks: [] }],
}))
const sectionDefinitions = [
  ['Über Linus Hüsler', 'text'],
  ['Kernkompetenzen', 'cards'],
  ['Erfahrung und Expertise in Zahlen', 'stats'],
  ['Beruflicher Werdegang', 'timeline'],
  ['Ausbildung und Zertifizierungen', 'cards'],
  ['Ausgewählte Projekte und Referenzen', 'features'],
  ['Stimmen aus gemeinsamen Projekten', 'quotes'],
  ['Publikationen, Interviews und Medien', 'features'],
  ['Sein Ansatz', 'principles'],
  ['Seine Haltung zur künstlichen Intelligenz', 'text'],
  ['Fachbeiträge von Linus Hüsler', 'articles'],
  ['Kontakt', 'contact'],
]
const sections = sectionDefinitions.map(([label, layout], index) => {
  const start = source.findIndex((p) => p.text === label)
  const end = index + 1 < sectionDefinitions.length ? source.findIndex((p) => p.text === sectionDefinitions[index + 1][0]) : source.length
  if (start < 0 || end < 0) throw new Error(`Abschnitt fehlt: ${label}`)
  return { label, layout, paragraphs: source.slice(start + 1, end) }
})

function makeSection({ label, layout, paragraphs }) {
  const result = { _type: 'profileSection', _key: `section-${++key}`, label, layout, title: layout === 'stats' ? undefined : paragraphs[0]?.text, content: [], entries: [] }
  const texts = layout === 'stats' ? paragraphs : paragraphs.slice(1)
  const entryTitles = new Set([
    'Künstliche Intelligenz und KI-Assistenten',
    'Digitalisierung und Prozessoptimierung',
    'Software- und Systemarchitektur',
    'Digitale Produktentwicklung und Product Ownership',
    'Unternehmensorganisation und agile Zusammenarbeit',
    'Dipl. Informatikingenieur FH – Hochschule Luzern',
    'Certified Scrum Product Owner (CSPO) – Scrum Alliance',
    'Schweizerische Post – Intelligenter Chatbot für den Kundendienst',
    'Apptiva Klar – Intelligente KI-Assistenten für Unternehmen',
    'Screenimage Systems AG – Softwarearchitektur für Digital Signage',
    'Kanton Schwyz – KI-Chatbots für die öffentliche Verwaltung',
  ])
  let current
  for (const paragraph of texts) {
    const isHeading = entryTitles.has(paragraph.text) || paragraph.text.startsWith('«') || /^\d\. /.test(paragraph.text) || layout === 'timeline' && /^(Seit 2015|2014–2015|2012–2014|2008–2011|2003–2007|Ab 2001)/.test(paragraph.text)
    if (layout === 'stats') {
      const [title, ...description] = paragraph.text.split(': ')
      result.entries.push({ _type: 'profileEntry', _key: `entry-${++key}`, title, content: blocks([description.join(': ')]) })
    } else if (isHeading) {
      current = { _type: 'profileEntry', _key: `entry-${++key}`, title: paragraph.text.replace(/^\d\. /, ''), content: [] }
      result.entries.push(current)
    } else if (current && paragraph.links?.length) {
      const href = paragraph.links.find((url) => url?.startsWith('https://'))
      if (href) {
        current.href = href.startsWith('https://apptiva.ch/') ? href.replace('https://apptiva.ch', '') : href
        current.linkText = paragraph.text
      }
    } else {
      const target = current ? current.content : result.content
      target.push(...blocks([paragraph.text]))
    }
  }
  return result
}

const articles = sections.find((section) => section.layout === 'articles').paragraphs
const contact = sections.find((section) => section.layout === 'contact').paragraphs
const profile = {
  _type: 'authorProfile', enabled: true,
  headline: source[1].text,
  introduction: source.slice(2, 4).map((p) => p.text).join('\n\n'),
  sections: sections.filter(({ layout }) => !['quotes', 'articles', 'contact'].includes(layout)).map(makeSection),
  articlesTitle: articles[0].text,
  articlesIntroduction: articles.slice(1, articles.findIndex((p) => p.text === 'Ausgewählte Fachbeiträge')).map((p) => p.text).join('\n\n'),
  contactTitle: contact[0].text,
  contactIntroduction: contact[1].text,
}

const people = await client.fetch('*[_type == "person" && personName == "Linus Hüsler"]')
const published = people.find((person) => !person._id.startsWith('drafts.'))
if (!published) throw new Error('Die bestehende Person Linus Hüsler wurde nicht gefunden.')
const draftId = `drafts.${published._id}`
const existing = people.find((person) => person._id === draftId) ?? published
if (existing.authorProfile) throw new Error('Es existiert bereits ein Autorenprofil. Bestehende Inhalte zuerst prüfen.')
const patch = {
  authorProfile: profile,
  slug: existing.slug?.current ? existing.slug : { _type: 'slug', current: 'linus-huesler' },
  contact: {
    ...existing.contact, _type: 'contact',
    socialNetworks: existing.contact?.socialNetworks?.length ? existing.contact.socialNetworks : [
      { _type: 'social', _key: 'linkedin', title: 'LinkedIn', url: 'https://www.linkedin.com/in/linushuesler/' },
    ],
  },
}

if (process.argv.includes('--apply')) {
  const { _rev, _createdAt, _updatedAt, ...document } = existing
  const transaction = client.transaction().createIfNotExists({ ...document, _id: draftId })
  transaction.patch(draftId, (builder) => {
    const guarded = existing._id === draftId ? builder.ifRevisionId(existing._rev) : builder
    return guarded.set(patch)
  })
  await transaction.commit()
  console.log(`Autorenprofil als Entwurf gespeichert: ${draftId}`)
} else {
  console.log(JSON.stringify({ person: published.personName, slug: patch.slug.current, sections: profile.sections.map(({ label, entries }) => ({ label, entries: entries.length })), status: 'Vorschau. Zum Speichern --apply ergänzen.' }, null, 2))
}
