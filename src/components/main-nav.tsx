import NextLink, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { navbarData } from './Navbar'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'

const MainNav = () => (
  <NavigationMenu className="hidden md:flex">
    <NavigationMenuList>
      {navbarData.map((item) => (
        <NavigationMenuItem key={item.href}>
          {item.type === 'one' ? (
            <>
              <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
              {item.items && (
                <NavigationMenuContent className="full left-0 right-0 top-0 flex flex-col bg-primary-dark p-4">
                  {item.items.map((subitem) => (
                    <Link href={subitem.href} key={subitem.href}>
                      {subitem.title}
                    </Link>
                  ))}
                </NavigationMenuContent>
              )}
            </>
          ) : (
            <Link href={item.href}>{item.title}</Link>
          )}
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
)

const Link = (props: LinkProps & { children: React.ReactNode }) => {
  const { href, ...rest } = props
  const pathname = usePathname()
  const isActive = href === pathname

  return (
    <NavigationMenuLink asChild active={isActive}>
      <NextLink href={href} className="NavigationMenuLink" {...rest} />
    </NavigationMenuLink>
  )
}

export default MainNav
