import Link from 'next/link'

const navbarData = [
  { title: 'Home', href: '/' },
  {
    title: 'Angebot',
    href: '/angebot/',
    type: 'one',
    items: [
      {
        title: 'Development',
        text: '',
        href: '/development/',
      },
      {
        title: 'Chatbot',
        text: '',
        href: '/chatbot/',
      },
      {
        title: 'Consulting',
        text: '',
        href: '/consulting/',
      },
    ],
  },
  { title: 'Projekte', href: '/projekte/' },
  {
    title: 'Apptiva',
    href: '/ueber-uns/',
    type: 'two',
    items: [
      {
        title: 'Kultur & Firmenfacts',
        text: 'Mehr über uns erfahren',
        href: '/ueber-uns/',
      },
      {
        title: 'Team',
        text: 'Unser erfahrenes Entwicklungsteam',
        href: '/ueber-uns/#team',
      },
      {
        title: 'Kompetenzen',
        text: 'Dies sind unsere Kompetenzen',
        href: '/unsere-kompetenzen/',
      },
      {
        title: 'Jobs',
        text: 'Jetzt bewerben',
        href: '/jobs/',
      },
    ],
  },
  { title: 'Kontakt', href: '/kontakt/' },
  { title: 'Blog', href: '/blog/' },
  {
    title: 'Wissen',
    href: '/wissen/',
    items: [
      {
        title: 'FAQ',
        href: '/faq/',
      },
      {
        title: 'Glossar',
        href: '/glossar/',
      },
    ],
  },
  { title: 'CMS', href: '/studio/' },
]

const Navbar = () => (
  <div className="full flex justify-around">
    {navbarData.map((item) => (
      <div key={item.href}>
        <ul key={item.href}>
          <li key={item.href}>
            <Link key={item.href} href={item.href} className='font-bold'>
              {item.title}
            </Link>
            {item.items && (
              <div >
                <ul>
                  {item.items.map((subitem) => (
                    <li key={subitem.href}>
                      <Link href={subitem.href}>{subitem.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    ))}
  </div>
)

export default Navbar
