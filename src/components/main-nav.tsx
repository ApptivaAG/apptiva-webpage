import Image from 'next/image'
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
                <NavigationMenuContent className="full left-0 right-0 top-0 flex flex-col bg-primary-dark p-2">
                  {item.items.map((subitem) => (
                    <Link
                      href={subitem.href}
                      key={subitem.href}
                      className="rounded-md p-2 align-middle hover:bg-primary-light/10"
                    >
                      <Image
                        src={subitem.icon}
                        alt={subitem.title}
                        className="aspect-square size-24 object-contain object-center py-2"
                      />
                      <div className="flex flex-col justify-center">
                        <span className="leading-6">{subitem.title}</span>
                        <small>{subitem.text}</small>
                      </div>
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

const Link = (
  props: LinkProps & { children: React.ReactNode; className?: string }
) => {
  const { href, className, ...rest } = props
  const pathname = usePathname()
  const isActive = href === pathname

  return (
    <NavigationMenuLink
      asChild
      active={isActive}
      className={`flex gap-5 hover:text-secondary ${className ?? ''}`}
    >
      <NextLink href={href} className="NavigationMenuLink" {...rest} />
    </NavigationMenuLink>
  )
}

export default MainNav
