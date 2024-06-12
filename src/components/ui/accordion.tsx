'use client'

import { cn } from '@/utils/cn'
import {
  Accordion as AccordionPrimitive,
  AccordionItem as Item,
} from '@szhsin/react-accordion'
import * as React from 'react'
import { IoChevronDown } from 'react-icons/io5'

const Accordion = AccordionPrimitive

const AccordionItem = ({
  header,
  children,
  className,
  icon,
  ...rest
}: {
  header: React.ReactNode
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
        {icon ?? (
          <IoChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 " />
        )}
      </>
    )}
    buttonProps={{
      className: cn(
        'flex justify-between hover:underline items-center w-full py-4 text-left hover:bg-slate-100 [&[aria-expanded=true]>svg]:rotate-180 group',
        className
      ),
    }}
    contentProps={{
      className: 'transition-height duration-200 ease-out',
    }}
    panelProps={{ className: 'pb-4 mt-0 pt-0 text-base' }}
  >
    {children}
  </Item>
)
AccordionItem.displayName = 'AccordionItem'

const AccordionContent = (props: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={cn('overflow-clip', props.className)}>{props.children}</div>
)

AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionContent, AccordionItem }
