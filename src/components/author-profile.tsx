import Link from 'next/link'
import { AuthorProfileData, ProfileSection } from '@/domain/author-profile'
import { cn } from '@/utils/cn'
import BreadCrumb from './bread-crumb'
import Heading from './heading'
import SanityImage from './sanity-image'
import Section from './section'
import StyledPortableText from './styled-portable-text'
import Button from './ui/button'

export default function AuthorProfile({
  person,
}: {
  person: AuthorProfileData
}) {
  const profile = person.authorProfile
  const sections =
    profile.sections?.filter(
      (section) =>
        section.content?.length || section.entries?.some((entry) => entry.title)
    ) ?? []
  const socialNetworks =
    person.contact?.socialNetworks?.filter((network) => network.url) ?? []

  return (
    <>
      <header className="full relative -mt-32 overflow-hidden bg-gradient-to-br from-primary to-primary-dark pb-16 pt-40 text-base-white md:pb-24 md:pt-48">
        <div className="content">
          <BreadCrumb
            className="pb-10"
            links={[
              { name: 'Über uns', href: '/ueber-uns' },
              { name: person.personName, href: `/autoren/${person.slug}` },
            ]}
          />
          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-widest text-secondary">
                Autor bei Apptiva
              </p>
              <Heading level={1}>{person.personName}</Heading>
              <p className="mt-6 text-xl text-secondary">
                {profile.headline ?? person.role}
              </p>
              {profile.introduction && (
                <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-base-white/85">
                  {profile.introduction}
                </p>
              )}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Button element="a" intent="secondary" href="#kontakt">
                  Kontakt aufnehmen
                </Button>
                {person.articles.length > 0 && (
                  <a
                    className="underline underline-offset-4"
                    href="#fachbeitraege"
                  >
                    Fachbeiträge lesen
                  </a>
                )}
              </div>
              {socialNetworks.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-6 text-sm">
                  {socialNetworks.map((network) => (
                    <a
                      key={network.url}
                      href={network.url ?? undefined}
                      className="underline underline-offset-4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {network.title} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
            {person.image && (
              <div className="relative mx-auto w-full max-w-md">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-4 h-3/4 w-3/4 rounded-lg bg-secondary"
                />
                <SanityImage
                  image={person.image}
                  className="relative aspect-[4/5] w-full rounded-lg object-cover"
                  sizes="(min-width: 1024px) 440px, 90vw"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {sections.length > 0 && (
        <nav
          aria-label="Profilabschnitte"
          className="full border-b border-primary/10 bg-base-grey-light"
        >
          <div className="content py-5">
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-primary">
              {sections.map((section) => (
                <a
                  key={section._key}
                  href={`#profil-${section._key}`}
                  className="underline-offset-4 hover:underline"
                >
                  {section.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}

      {sections.map((section, index) => (
        <ProfileSectionView
          key={section._key}
          section={section}
          index={index}
        />
      ))}

      {person.articles.length > 0 && (
        <Section id="fachbeitraege" intent="lightGray">
          <div className="content">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest">
              Fachbeiträge von {person.personName}
            </p>
            <Heading level={2} size={3}>
              {profile.articlesTitle ?? 'Wissen aus der Praxis'}
            </Heading>
            {profile.articlesIntroduction && (
              <p className="mt-6 max-w-3xl text-lg leading-relaxed">
                {profile.articlesIntroduction}
              </p>
            )}
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {person.articles.slice(0, 6).map((article) => (
                <Link
                  key={article._id}
                  href={`/${article.isLearning ? 'apptiva-lernt' : 'blog'}/${article.slug}`}
                  className="group flex flex-col rounded-lg bg-base-white p-6 transition-shadow hover:shadow-lg md:p-8"
                >
                  {article.publishedAt && (
                    <time
                      className="mb-4 text-sm"
                      dateTime={article.publishedAt}
                    >
                      {new Date(article.publishedAt).toLocaleDateString(
                        'de-CH'
                      )}
                    </time>
                  )}
                  <Heading level={3} size={4}>
                    {article.title || article.name}
                  </Heading>
                  {article.lead && (
                    <p className="mt-4 leading-relaxed">{article.lead}</p>
                  )}
                  <span className="mt-auto pt-6 font-bold underline underline-offset-4">
                    Beitrag lesen →
                  </span>
                </Link>
              ))}
            </div>
          </div>
          {person.articles.length > 6 && (
            <details className="mt-8">
              <summary className="cursor-pointer font-bold underline underline-offset-4">
                Weitere Fachbeiträge von {person.personName}
              </summary>
              <ul className="mt-6 space-y-4">
                {person.articles.slice(6).map((article) => (
                  <li key={article._id}>
                    <Link
                      className="underline underline-offset-4"
                      href={`/${article.isLearning ? 'apptiva-lernt' : 'blog'}/${article.slug}`}
                    >
                      {article.title || article.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </Section>
      )}

      <Section id="kontakt" intent="dark">
        <div className="content">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-secondary">
                Kontakt
              </p>
              <Heading level={2} size={3}>
                {profile.contactTitle ?? 'Lass uns dein Vorhaben besprechen'}
              </Heading>
              {profile.contactIntroduction && (
                <p className="mt-6 text-lg leading-relaxed">
                  {profile.contactIntroduction}
                </p>
              )}
              <Button
                element="a"
                href="/kontakt"
                intent="secondary"
                className="mt-8 inline-block"
              >
                Kontakt aufnehmen
              </Button>
            </div>
            <address className="flex flex-col items-start gap-4 not-italic lg:pt-10">
              <p className="text-2xl font-bold">{person.personName}</p>
              {person.role && <p>{person.role}</p>}
              {person.contact?.mail && (
                <a
                  className="break-all underline underline-offset-4"
                  href={`mailto:${person.contact.mail}`}
                >
                  {person.contact.mail}
                </a>
              )}
              {person.contact?.phone && (
                <a
                  className="underline underline-offset-4"
                  href={`tel:${person.contact.phone.replace(/\s/g, '')}`}
                >
                  {person.contact.phone}
                </a>
              )}
              {socialNetworks.map((network) => (
                <a
                  key={network.url}
                  href={network.url ?? undefined}
                  className="underline underline-offset-4"
                >
                  {network.title} ↗
                </a>
              ))}
              <p className="mt-4">
                Apptiva AG
                <br />
                Obergrundstrasse 73
                <br />
                6003 Luzern, Schweiz
              </p>
            </address>
          </div>
        </div>
      </Section>
    </>
  )
}

function ProfileSectionView({
  section,
  index,
}: {
  section: ProfileSection
  index: number
}) {
  const entries = section.entries?.filter((entry) => entry.title) ?? []
  const layout = section.layout ?? 'text'
  const dark = layout === 'stats'
  return (
    <Section
      id={`profil-${section._key}`}
      intent={dark ? 'dark' : index % 2 ? 'lightGray' : 'light'}
    >
      <div className="content">
        <div
          className={cn(
            layout === 'text' && 'grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20'
          )}
        >
          <div>
            <p
              className={cn(
                'mb-4 text-sm font-bold uppercase tracking-widest',
                dark && 'text-secondary'
              )}
            >
              {section.label}
            </p>
            {(section.title || dark) && (
              <Heading level={2} size={3}>
                {section.title ?? 'Erfahrung aus der Praxis'}
              </Heading>
            )}
          </div>
          {section.content?.length ? (
            <div
              className={cn(
                'max-w-3xl space-y-4 text-lg leading-relaxed',
                layout !== 'text' && 'mt-6'
              )}
            >
              <StyledPortableText content={section.content} />
            </div>
          ) : null}
        </div>
        {entries.length > 0 && (
          <div
            className={cn(
              'mt-10 grid gap-6',
              ['cards', 'quotes', 'principles'].includes(layout) &&
                'md:grid-cols-2',
              layout === 'stats' && 'sm:grid-cols-2 lg:grid-cols-3'
            )}
          >
            {entries.map((entry, entryIndex) => (
              <div
                key={entry._key}
                className={cn(
                  'min-w-0',
                  ['cards', 'quotes', 'principles'].includes(layout) &&
                    'rounded-lg bg-base-white p-6 md:p-8',
                  layout === 'timeline' &&
                    'border-l-2 border-primary/20 py-2 pl-6 md:pl-10',
                  layout === 'features' &&
                    'border-t border-primary/20 py-8 md:grid md:grid-cols-[1fr_1.4fr] md:gap-16',
                  layout === 'stats' && 'border-t border-base-white/25 py-6'
                )}
              >
                <div>
                  {layout === 'principles' && (
                    <p
                      aria-hidden="true"
                      className="mb-6 text-4xl font-bold text-primary-light"
                    >
                      {String(entryIndex + 1).padStart(2, '0')}
                    </p>
                  )}
                  {entry.subtitle && layout !== 'stats' && (
                    <p className="mb-3 text-sm font-bold text-primary-light">
                      {entry.subtitle}
                    </p>
                  )}
                  <Heading
                    level={3}
                    size={layout === 'stats' ? 2 : 4}
                    className={dark ? 'text-secondary' : undefined}
                  >
                    {entry.title}
                  </Heading>
                  {entry.subtitle && layout === 'stats' && (
                    <p className="mt-3 text-lg">{entry.subtitle}</p>
                  )}
                </div>
                <div>
                  {entry.content?.length ? (
                    layout === 'quotes' ? (
                      <blockquote className="mt-4 space-y-3 text-lg leading-relaxed">
                        <StyledPortableText content={entry.content} />
                      </blockquote>
                    ) : (
                      <div
                        className={cn(
                          'space-y-3 leading-relaxed',
                          layout !== 'features' && 'mt-4'
                        )}
                      >
                        <StyledPortableText content={entry.content} />
                      </div>
                    )
                  ) : null}
                  {entry.href && (
                    <a
                      href={entry.href}
                      className="mt-6 inline-block font-bold underline underline-offset-4"
                      {...(entry.href.startsWith('https://')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {entry.linkText ?? 'Mehr erfahren'} ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
