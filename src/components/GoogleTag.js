import React from 'react'
import { Helmet } from 'react-helmet'

const GoogleTag = () => (
  <Helmet>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=AW-869564557"
    />
    <script>
      {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-869564557');
        `}
    </script>
  </Helmet>
)

export default GoogleTag
