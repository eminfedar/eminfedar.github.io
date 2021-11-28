import React from 'react'
import Helmet from 'react-helmet'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet>
      <title>Emin Fedar</title>
      <meta
        name="description"
        content="Emin Fedar Kişisel Blog sitesidir. C++, Rust, Pardus GNU/Linux, İşlemci Tasarımı"
      />
      <meta
        name="keywords"
        content="emin, fedar, emin fedar, c++, cpp, development, rust, async, await, c++11, auto, constexpr"
      />
      <meta charSet="utf-8" />
      <meta name="theme-color" content="#663399" />
      <link rel="canonical" href="https://eminfedar.com" />
    </Helmet>
    <Helmet
      script={[
        {
          type: 'text/javascript',
          innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-FNY55777ZG');`,
        },
      ]}
    />
    <div>{children}</div>
  </div>
)

export default TemplateWrapper
