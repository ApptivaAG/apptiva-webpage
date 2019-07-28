const React = require('react')

// IE11 is broken without this polyfill
exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />,
  ])
}
