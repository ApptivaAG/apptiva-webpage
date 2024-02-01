import Link from 'next/link'

const navbarData = [
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
  { title: 'Blog', href: '/blog/' },
]

const Navbar = () => (
  <div className="fixed w-full p-4">
    <div className="flex justify-around rounded-md bg-[#053A78dd] p-6 text-base-white">
      <nav className="flex justify-around gap-8 rounded bg-black/40 px-6 py-3">
        {navbarData.map((item) => (
          <div key={item.href}>
            <ul key={item.href}>
              <li key={item.href}>
                <Link key={item.href} href={item.href} className="">
                  {item.title}
                </Link>
                {/* {item.items && (
                <div>
                  <ul>
                    {item.items.map((subitem) => (
                      <li key={subitem.href}>
                        <Link href={subitem.href}>{subitem.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}
              </li>
            </ul>
          </div>
        ))}
      </nav>
    </div>
  </div>
)

export default Navbar
