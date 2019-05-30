import React from 'react'
import { FaStar } from 'react-icons/fa'
import { Icon } from '../style'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    const { icon } = this.props
    console.log(`Can't find icon ${icon} in FontAwesom`, error, info)
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <Icon>
          <FaStar />
        </Icon>
      )
    }

    return children
  }
}

export default ErrorBoundary
