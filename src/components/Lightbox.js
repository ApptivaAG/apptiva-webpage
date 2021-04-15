import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const Modal = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2rem;
  background-color: hsla(0, 0%, 100%, 0.99);
  text-align: center;
  z-index: 100;
  cursor: pointer;
`
const ImgStyled = styled.img`
  max-height: 100%;
  max-width: 100%;
  justify-self: center;
  align-self: center;
`

export const LightboxImageStyle = createGlobalStyle`
  .lightbox, .gatsby-resp-image-wrapper {
      cursor: pointer;
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.06);
      }
    }
`

class Lightbox extends React.Component {
  constructor() {
    super()
    this.state = { open: false }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen(e) {
    // TODO: improvement for keyboard users that keypress on link
    if (
      e.target.className.includes('gatsby-resp-image-image') ||
      e.target.closest('.lightbox') !== null
    ) {
      e.preventDefault()
      // only on tablet and larger
      if (window.innerWidth > 400) {
        const { src, srcset, alt } = e.target
        this.setState((prev) => ({
          open: !prev.open,
          src,
          srcset,
          alt,
        }))
      }
    }
  }

  handleClose() {
    this.setState({ open: false })
  }

  render() {
    const { open, src, srcset, alt } = this.state
    const { children } = this.props
    return (
      <div onClick={this.handleOpen} role="presentation">
        {children}
        {open && (
          <Modal onClick={this.handleClose}>
            <ImgStyled src={src} srcSet={srcset} alt={alt} />
            <h3>{alt}</h3>
          </Modal>
        )}
      </div>
    )
  }
}

export default Lightbox
