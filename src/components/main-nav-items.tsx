import Image from 'next/image'
import NextLink, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import {
  NavbarCTALink,
  NavbarItemLinkWithMedia,
  NavbarItemSimpleLink,
  NavbarItemSubMenu,
} from './Navbar'
import { Accordion, AccordionContent, AccordionItem } from './ui/accordion'
import Button from './ui/button'
import { NavigationMenuLink } from './ui/navigation-menu'

type MediaLinkProps = { subitem: NavbarItemLinkWithMedia; index: number }
type SimpleLinkProps = { subitem: NavbarItemSimpleLink; index: number }
type SubMenuProps = { subMenu: NavbarItemSubMenu; index: number }
type CtaLinkProps = { subitem: NavbarCTALink; index: number }

export const MediaLink = ({ subitem, index }: MediaLinkProps) => (
  <Link
    href={subitem.href}
    className="flex flex-col items-center rounded-md border border-base-white/10 p-2 py-6 align-bottom hover:basis-1/2 hover:bg-primary-light/10"
  >
    <Image
      src={subitem.icon}
      alt={subitem.title}
      className="aspect-square size-32 object-contain py-2"
    />

    <div className="flex flex-col items-center pr-2 text-center">
      <span className="pb-1">{subitem.title}</span>
      <small className="items-center leading-normal">{subitem.text}</small>
    </div>
  </Link>
)

export const SimpleLink = ({ subitem, index }: SimpleLinkProps) => (
  <Link
    href={subitem.href}
    className="rounded-md align-middle hover:bg-primary-light/10"
  >
    <div className="flex flex-col justify-end">
      <span className="px-2 py-1">{subitem.title}</span>
    </div>
  </Link>
)

export const SubMenu = ({ subMenu, index }: SubMenuProps) => (
  <Accordion>
    <AccordionItem
      header={subMenu.title}
      className="rounded px-2 py-1 hover:translate-y-0 hover:bg-primary-light/10 hover:text-secondary"
      panelClassName="pb-2"
    >
      <AccordionContent className="mt-2 rounded bg-primary px-3 py-1">
        {subMenu.items.map((subitem) => (
          <SimpleLink
            subitem={subitem}
            index={index}
            key={subitem.title + index}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

export const CtaLink = ({ subitem, index }: CtaLinkProps) => (
  <Link href={subitem.href} className="rounded-md hover:bg-primary-light/10">
    <Button intent="secondary" className="w-full">
      {subitem.title}
    </Button>
  </Link>
)

export const Link = (
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
