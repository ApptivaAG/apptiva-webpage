import { useEffect, useState } from 'react'
import { CtaLink, Link, MediaLink, SimpleLink, SubMenu } from './main-nav-items'
import { navbarData } from './Navbar'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'

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
                          <MediaLink
                            subitem={subitem}
                            index={index}
                            key={subitem.title + index}
                          />
                        ))}
                    </div>
                    <div className="col-start-2 flex flex-col justify-between pb-4 pr-4 pt-2">
                      <>
                        {item.items
                          .filter(
                            (item) =>
                              item.type === 'link' || item.type === 'sub-menu'
                          )
                          .map((subitem, index) => {
                            switch (subitem.type) {
                              case 'link':
                                return (
                                  <SimpleLink
                                    subitem={subitem}
                                    index={index}
                                    key={subitem.title + index}
                                  />
                                )
                              case 'sub-menu':
                                return (
                                  <SubMenu
                                    subMenu={subitem}
                                    index={index}
                                    key={subitem.title + index}
                                  />
                                )
                            }
                          })}
                      </>
                      <div className="ml-2 mt-4">
                        {item.items
                          .filter((item) => item.type === 'cta-link')
                          .map((subitem, index) => (
                            <CtaLink
                              subitem={subitem}
                              index={index}
                              key={subitem.title + index}
                            />
                          ))}
                      </div>
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

export default MainNav
