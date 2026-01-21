import { type SchemaTypeDefinition } from 'sanity'
import aboutPage from './schemas/documents/about-page'
import blog from './schemas/documents/blog'
import faq from './schemas/documents/faq'
import glossary from './schemas/documents/glossary'
import homepage from './schemas/documents/homepage'
import person from './schemas/documents/person'
import project from './schemas/documents/project'
import servicePage from './schemas/documents/service-page'
import tag from './schemas/documents/tag'
import card from './schemas/objects/card'
import contact from './schemas/objects/contact'
import header from './schemas/objects/header'
import imageWithAlt from './schemas/objects/image-with-alt'
import link from './schemas/objects/link'
import meta from './schemas/objects/meta'
import module from './schemas/objects/module'
import priceCard from './schemas/objects/price-card'
import skill from './schemas/objects/skill'
import skillItem from './schemas/objects/skill-item'
import social from './schemas/objects/social'
import cta from './schemas/objects/cta'
import mediaPage from './schemas/documents/media-page'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    servicePage,
    faq,
    glossary,
    project,
    header,
    module,
    tag,
    blog,
    person,
    social,
    contact,
    skill,
    skillItem,
    imageWithAlt,
    link,
    cta,
    homepage,
    meta,
    card,
    priceCard,
    aboutPage,
    mediaPage,
  ],
}
