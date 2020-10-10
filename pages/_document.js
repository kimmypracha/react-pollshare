import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head> 
            <title> Pollshare : The Freedom of Poll</title>
            <meta name='application-name' content='Pollshare App' />
            <meta name='description' content='Best Pollshare app in the world' />
            <meta name='apple-mobile-web-app-capable' content='yes' />
            <meta name='apple-mobile-web-app-status-bar-style' content='default' />
            <meta name='apple-mobile-web-app-title' content='Pollshare App' />
            <meta name='mobile-web-app-capable' content='yes' />
            <link rel='manifest' href='/manifest.json' />
            <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
            <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument