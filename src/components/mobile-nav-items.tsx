import { cn } from '@/utils/cn'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import {
  NavbarItemLinkWithMedia,
  NavbarItemSimpleLink,
  NavbarItemSubMenu,
} from './Navbar'
import { Accordion, AccordionContent, AccordionItem } from './ui/accordion'

type MediaLinkProps = {
  subitem: NavbarItemLinkWithMedia
  setOpen: (open: boolean) => void
}
type SimpleLinkProps = {
  subitem: NavbarItemSimpleLink
  setOpen: (open: boolean) => void
}
type SubMenuProps = {
  subMenu: NavbarItemSubMenu
  setOpen: (open: boolean) => void
}

export const MediaLink = ({ subitem, setOpen }: MediaLinkProps) => (
  <MobileLink
    href={subitem.href}
    onOpenChange={setOpen}
    className="flex items-center gap-5 py-4"
  >
    <Image src={subitem.icon} alt={subitem.title} className="size-24" />
    <div className="">
      <p className="text-lg">{subitem.title}</p>
      <p className="text-xs">{subitem.text}</p>
    </div>
  </MobileLink>
)

export const SimpleLink = ({ subitem, setOpen }: SimpleLinkProps) => (
  <MobileLink
    href={subitem.href}
    onOpenChange={setOpen}
    className="flex items-center gap-5 py-4"
  >
    <p className="text-lg">{subitem.title}</p>
  </MobileLink>
)

export const SubMenu = ({ subMenu, setOpen }: SubMenuProps) => (
  <Accordion>
    <AccordionItem header={<span className="text-lg">{subMenu.title}</span>}>
      <AccordionContent className="rounded bg-primary-dark/50 px-2">
        {subMenu.items.map((subitem, index) => (
          <SimpleLink
            subitem={subitem}
            setOpen={setOpen}
            key={subitem.title + index}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

export function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
