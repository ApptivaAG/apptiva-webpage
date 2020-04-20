const React = require('react')

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      id="chatbot"
      data-server="https://chatbot.apptiva.ch/webclient"
      defer
      src="https://chatbot.apptiva.ch/webclient/embed/bundle.js"
    />,
  ])
}
