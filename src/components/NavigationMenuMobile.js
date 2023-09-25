import React from 'react'
import styled from 'styled-components'
import { MenuContent, DynLink } from './NavigationMenuDesktop'
import logo from '../img/logo-narrow.svg'

const NavigationMenuMobile = ({ data, location }) => (
  <Navigation>
    {data.map((item) => {
      return item.items || item.callout ? (
        <>
          <p className="NavigationMenuLink Title">{item.title}</p>
          <MenuContent key={item} item={item} NavigationLink={DynLink} />
        </>
      ) : (
        <DynLink
          className="NavigationMenuLink"
          key={item}
          type={location}
          nav={item.href}
        >
          {item.title}
        </DynLink>
      )
    })}
    <div css="flex: 1; display: flex; flex-direction: column; justify-content: flex-end; padding: 12px; margin-block: 1em;">
      <DynLink type={location} nav="/#start" data-element="logo">
        <Logo src={logo} alt="Apptiva" width="147" height="30" />
      </DynLink>
    </div>
  </Navigation>
)

const Logo = styled.img`
  height: 30px;
`
export const Navigation = styled.nav`
  display: none;
  @media (max-width: 900px) {
    position: fixed;
    display: flex;
    flex-direction: column;
    font-size: 1.1em;
    top: 0;
    bottom: 0;
    right: -26rem;
    border-left: 1px solid #fff2;
    padding-inline: 0.5em;
    background-color: white;
    transition: all 200ms ease 200ms;
    overflow-y: auto;
    max-height: 100vh;
    max-height: 100dvh;
    box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
  }

  /* reset */
  button,
  p {
    all: unset;
  }
  li {
    margin: 0;
  }

  a {
    color: white;
    width: 100%;
  }
  .NavigationImage {
    display: none;
  }
  .ListItemText {
    display: none;
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
    margin-top: 0.5em;
    padding: 12px 8px;
    outline: none;
    user-select: none;
    font-weight: 500;
    line-height: 1;
    border-radius: 4px;
    font-size: 1em;
    color: ${(p) => p.theme.color.primary};
    border-radius: 0.2em;

    &.Title {
      color: #000;
      padding-bottom: 0;
    }
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
    width: 80%;
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

  .List {
    display: grid;
    padding: 0;
    margin: 0.5em 0 0 0;
    column-gap: 0.2em;
    list-style: none;
    max-width: 17rem;
  }
  .List.one {
    grid-template-columns: 1fr;
    margin-top: 0;
    gap: 0.2em;
  }
  .List.two {
    grid-template-columns: 1fr;
    gap: 0.2em;
  }
  .callout {
    grid-template:
      'callout callout'
      'item item' / 1fr 1fr !important;
    border-radius: 0.3em;
    margin-block: 0.5em 0.2em !important;
    background-color: ${(p) => p.theme.color.primary};
    padding: 0.2em;
  }

  .ListItemLink {
    display: block;
    outline: none;
    text-decoration: none;
    user-select: none;
    padding: 12px 10px;
    border-radius: 6px;
    font-size: 15px;
    line-height: 1;
    border-radius: 0.3em;
    background-color: ${(p) => p.theme.color.primary};
  }

  .callout .ListItemLink {
    color: ${(p) => p.theme.color.primary};
    background-color: white;
  }

  .ListItemLink:focus {
    box-shadow: 0 0 0 2px #008fd7;
  }

  .ListItemHeading {
    font-weight: 400;
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

    padding: 8px;
    text-decoration: none;
    outline: none;
    user-select: none;
  }
  .Callout:focus {
    box-shadow: 0 0 0 2px #008fd7;
  }

  .CalloutHeading {
    font-weight: 500;
    font-size: 0.9rem;
    line-height: 1.1;
    margin-bottom: 0.2em;
    margin-top: -0.1em;
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

export default NavigationMenuMobile
