import React from 'react'
import styled from 'styled-components'

const Modal = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2rem;
  background-color: hsla(0, 0%, 100%, 0.9);
  text-align: center;
  z-index: 100;
`
const ImgStyled = styled.img`
  max-height: 100%;
  max-width: 100%;
  justify-self: center;
  align-self: center;
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
      e.target.className === 'gatsby-resp-image-image' ||
      (e.target.parentNode.className &&
        e.target.parentNode.className.includes &&
        e.target.parentNode.className.includes('lightbox'))
    ) {
      e.preventDefault()
      // only on tablet and larger
      if (window.innerWidth > 400) {
        const { src, srcset, alt } = e.target
        this.setState(prev => ({
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
    return (
      <div onClick={this.handleOpen} role="presentation">
        {this.props.children}
        {this.state.open && (
          <Modal onClick={this.handleClose}>
            <ImgStyled
              src={this.state.src}
              srcSet={this.state.srcset}
              alt={this.state.alt}
            />
            <h3>{this.state.alt}</h3>
          </Modal>
        )}
      </div>
    )
  }
}

export default Lightbox
