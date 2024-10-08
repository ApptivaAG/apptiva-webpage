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
  NavigationMenuSub,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from './ui/navigation-menu'
import { useEffect, useState } from 'react'
import Button from './ui/button'

const MainNav = () => {
  const [initialMount, setInitialMount] = useState<true | undefined>(true)

  useEffect(() => {
    setInitialMount(undefined)
  }, [])
  return (
    <NavigationMenu className="hidden lg:flex" delayDuration={0}>
      <NavigationMenuList>
        {navbarData.map((item, index) => (
          <NavigationMenuItem key={index} className="[&>div]:hidden">
            {item.type === 'menu' ? (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                {item.items && (
                  <NavigationMenuContent
                    forceMount={initialMount}
                    className="full left-0 right-0 top-0 grid grid-cols-2 bg-primary-dark p-2"
                  >
                    <div className="p-4 align-middle">
                      {item.items
                        .filter((item) => item.type === 'media-link')
                        .map((subitem, index) => (
                          <Link
                            href={subitem.href}
                            key={
                              subitem.href + ' ' + subitem.title + ' ' + index
                            }
                            className="flex flex-col items-center rounded-md border border-base-white/10 p-2 py-6 align-bottom hover:basis-1/2 hover:bg-primary-light/10"
                          >
                            <Image
                              src={subitem.icon}
                              alt={subitem.title}
                              className="aspect-square size-32 object-contain py-2"
                            />

                            <div className="flex flex-col items-center pr-2 text-center">
                              <span className="pb-1">{subitem.title}</span>
                              <small className="items-center leading-normal">
                                {subitem.text}
                              </small>
                            </div>
                          </Link>
                        ))}
                    </div>
                    <div className="col-start-2 flex flex-col pb-4 pr-4 pt-2">
                      <>
                        {item.items
                          .filter((item) => item.type === 'link')
                          .map((subitem, index) => (
                            <Link
                              href={subitem.href}
                              key={
                                subitem.href + ' ' + subitem.title + ' ' + index
                              }
                              className="rounded-md align-middle hover:bg-primary-light/10"
                            >
                              <div className="flex flex-col justify-end">
                                <span className="px-2 py-1">
                                  {subitem.title}
                                </span>
                              </div>
                            </Link>
                          ))}
                        {item.items.find((item) => item.type === 'cta-link') &&
                          item.items
                            .filter((item) => item.type === 'cta-link')
                            .map((subitem, index) => (
                              <Link
                                href={subitem.href}
                                key={
                                  subitem.href +
                                  ' ' +
                                  subitem.title +
                                  ' ' +
                                  index
                                }
                                className="ml-2 mt-auto rounded-md hover:bg-primary-light/10"
                              >
                                <Button intent="secondary" className="w-full">
                                  {subitem.title}
                                </Button>
                              </Link>
                            ))}
                      </>
                    </div>
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
}

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
      className={`hover:text-secondary ${className ?? ''}`}
    >
      <NextLink href={href} className="NavigationMenuLink" {...rest} />
    </NavigationMenuLink>
  )
}

export default MainNav
