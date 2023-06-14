import React from 'react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { CaretDownIcon } from '@radix-ui/react-icons'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

const NavigationMenuDesktop = ({ data }) => {
  return (
    <Style>
      <NavigationMenu.Root className="NavigationMenuRoot">
        <NavigationMenu.List className="NavigationMenuList">
          {data.map((item) =>
            item.items || item.callout ? (
              <NavigationMenu.Item key={item}>
                <NavigationMenu.Trigger className="NavigationMenuTrigger">
                  {item.title}
                  <CaretDownIcon className="CaretDown" aria-hidden />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="NavigationMenuContent">
                  <MenuContent
                    item={item}
                    NavigationLink={NavigationMenu.Link}
                  />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ) : (
              <NavigationMenu.Link
                key={item}
                className="NavigationMenuLink"
                href={item.href}
                NavigationLink={NavigationMenu.Link}
              >
                {item.title}
              </NavigationMenu.Link>
            )
          )}

          <NavigationMenu.Indicator className="NavigationMenuIndicator">
            <div className="Arrow" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>
        <div className="ViewportPosition">
          <NavigationMenu.Viewport className="NavigationMenuViewport" />
        </div>
      </NavigationMenu.Root>
    </Style>
  )
}

export const MenuContent = ({ item, NavigationLink }) => (
  <>
    {item.callout && (
      <ul className={`List ${item.type} callout`}>
        <li style={{ gridArea: `callout` }}>
          <NavigationLink asChild>
            <DynLink className="Callout" href={item.callout.href}>
              <div className="CalloutHeading">{item.callout.title}</div>
              <p className="CalloutText">{item.callout.text}</p>
              <div
                className="NavigationImage"
                css="pointer-events: none; margin-top: 1em;"
              >
                {item.callout.image}
              </div>
            </DynLink>
          </NavigationLink>
        </li>
        {item.callout?.items?.map((calloutItem) => (
          <ListItem
            key={calloutItem}
            href={calloutItem.href}
            title={calloutItem.title}
            NavigationLink={NavigationLink}
          >
            {calloutItem.text}
          </ListItem>
        ))}
      </ul>
    )}
    <ul className={`List ${item.type}`}>
      {item.items?.map((subitems) =>
        subitems.image ? (
          <>
            <ListItem
              key={subitems}
              href={subitems.href}
              title={subitems.title}
              variant={`span ${item.items.length}`}
              NavigationLink={NavigationLink}
            >
              <p className="CalloutText">{subitems.text}</p>
              <div
                className="NavigationImage"
                css="pointer-events: none; margin-top: 1em;"
              >
                {subitems.image}
              </div>
            </ListItem>
          </>
        ) : (
          <ListItem
            key={subitems}
            href={subitems.href}
            title={subitems.title}
            NavigationLink={NavigationLink}
          >
            {subitems.text}
          </ListItem>
        )
      )}
    </ul>
  </>
)

// eslint-disable-next-line react/display-name
export const ListItem = React.forwardRef(
  (
    { className, children, title, variant, NavigationLink, ...props },
    forwardedRef
  ) => (
    <li style={{ gridRow: variant }}>
      <NavigationLink asChild>
        <DynLink
          className={`ListItemLink ${className}`}
          {...props}
          ref={forwardedRef}
        >
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </DynLink>
      </NavigationLink>
    </li>
  )
)

const shared = (props) =>
  props['data-element'] !== 'logo' &&
  css`
    display: inline-block;
    font-size: 1.1em;
    font-weight: 500;
    color: white;

    transition: transform 30ms ease-out;

    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      color: ${props.theme.color.secondary};
    }
  `
const NavItemsLink = styled(Link)`
  ${shared};
`
const NavItemsA = styled.a`
  ${shared};
`

export const DynLink = ({ type, nav, ...props }) =>
  type === 'root' ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <NavItemsA href={nav} {...props} />
  ) : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <NavItemsLink to={nav} {...props} />
  )

const Style = styled.div`
  @media only screen and (max-width: 900px) {
    display: none;
  }
  a {
    color: hsla(200, 100%, 35%, 1);
  }
  flex: 1;
  /* reset */
  button,
  p {
    all: unset;
  }
  li {
    margin: 0;
  }

  .NavigationMenuRoot {
    position: relative;
    display: flex;
    justify-content: right;
    z-index: 1;
  }

  .NavigationMenuList {
    display: flex;
    justify-content: center;
    padding: 4px;
    border-radius: 6px;
    list-style: none;
    box-shadow: 0 2px 10px var(--blackA7);
    margin: 0;
  }

  .NavigationMenuTrigger,
  .NavigationMenuLink {
    padding: 8px 12px;
    outline: none;
    user-select: none;
    font-weight: 500;
    line-height: 1;
    border-radius: 4px;
    font-size: 1em;
    color: white;
  }
  .NavigationMenuTrigger:focus,
  .NavigationMenuLink:focus {
    box-shadow: 0 0 0 2px var(--violet7);
  }
  .NavigationMenuTrigger:hover,
  .NavigationMenuLink:hover {
    background-color: var(--violet3);
  }

  .NavigationMenuTrigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2px;
  }

  .NavigationMenuLink {
    display: block;
    text-decoration: none;
    font-size: 1em;
    line-height: 1;
  }

  .NavigationMenuContent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    animation-duration: 250ms;
    animation-timing-function: ease;
  }
  .NavigationMenuContent[data-motion='from-start'] {
    animation-name: enterFromLeft;
  }
  .NavigationMenuContent[data-motion='from-end'] {
    animation-name: enterFromRight;
  }
  .NavigationMenuContent[data-motion='to-start'] {
    animation-name: exitToLeft;
  }
  .NavigationMenuContent[data-motion='to-end'] {
    animation-name: exitToRight;
  }
  @media only screen and (min-width: 600px) {
    .NavigationMenuContent {
      width: auto;
    }
  }

  .NavigationMenuIndicator {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 10px;
    top: 82%;
    overflow: hidden;
    z-index: 1;
    transition: width, transform 250ms ease;
  }
  .NavigationMenuIndicator[data-state='visible'] {
    animation: fadeIn 200ms ease;
  }
  .NavigationMenuIndicator[data-state='hidden'] {
    animation: fadeOut 200ms ease;
  }

  .NavigationMenuViewport {
    position: relative;
    transform-origin: top center;
    margin-top: 2px;
    width: 100%;
    background-color: white;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    height: var(--radix-navigation-menu-viewport-height);
    transition: width, height, 300ms ease;
  }
  .NavigationMenuViewport[data-state='open'] {
    animation: scaleIn 200ms ease;
  }
  .NavigationMenuViewport[data-state='closed'] {
    animation: scaleOut 200ms ease;
  }
  @media only screen and (min-width: 600px) {
    .NavigationMenuViewport {
      width: var(--radix-navigation-menu-viewport-width);
    }
  }

  .List {
    display: grid;
    padding: 22px;
    margin: 0;
    column-gap: 10px;
    list-style: none;
  }
  @media only screen and (min-width: 600px) {
    .List.one {
      width: 700px;
      grid-template: 'item item item';
    }
    .List.two {
      width: 600px;
      grid-auto-flow: column;
      grid-template-rows: repeat(3, 1fr);
    }
    .callout {
      grid-template:
        'callout item item'
        'callout item item'
        'callout item item' !important;
      background-color: #eff6fc;
    }
  }

  .ListItemLink {
    display: block;
    outline: none;
    text-decoration: none;
    user-select: none;
    padding: 12px;
    border-radius: 6px;
    font-size: 15px;
    line-height: 1;
  }
  .ListItemLink:focus {
    box-shadow: 0 0 0 2px #008fd7;
  }
  .ListItemLink:hover {
    background-color: #d4e8f8;
  }

  .ListItemHeading {
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 1px;
    color: var(--violet12);
  }

  .ListItemText {
    color: var(--mauve11);
    line-height: 1.4;
    font-weight: initial;
  }

  .Callout {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 6px;

    padding-inline: 25px;
    text-decoration: none;
    outline: none;
    user-select: none;
  }
  .Callout:focus {
    box-shadow: 0 0 0 2px #008fd7;
  }
  .Callout:hover {
    background-color: #d4e8f8;
  }

  .CalloutHeading {
    color: hsla(200, 100%, 35%, 1);
    font-weight: bold;
    font-size: 1em;
    line-height: 1.2;
    margin-top: 16px;
    margin-bottom: 2px;
  }

  .CalloutText {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.3;
  }

  .ViewportPosition {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    top: 100%;
    left: 0;
    perspective: 2000px;
  }

  .CaretDown {
    position: relative;
    color: var(--violet10);
    top: 1px;
    transition: transform 250ms ease;
    height: 22px;
    width: 22px;
    margin-block: -4px;
  }
  [data-state='open'] > .CaretDown {
    transform: rotate(-180deg);
  }

  .Arrow {
    position: relative;
    top: 55%;
    background: #ffffffee;
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    border-top-left-radius: 3px;
  }

  @keyframes enterFromRight {
    from {
      opacity: 0;
      transform: translateX(200px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes enterFromLeft {
    from {
      opacity: 0;
      transform: translateX(-200px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes exitToRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(200px);
    }
  }

  @keyframes exitToLeft {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-200px);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: rotateX(-30deg) scale(0.9);
    }
    to {
      opacity: 1;
      transform: rotateX(0deg) scale(1);
    }
  }

  @keyframes scaleOut {
    from {
      opacity: 1;
      transform: rotateX(0deg) scale(1);
    }
    to {
      opacity: 0;
      transform: rotateX(-10deg) scale(0.95);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`

export default NavigationMenuDesktop
