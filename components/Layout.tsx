import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children: ReactNode
  title?: string
}

const Layout = ({
  children,
  title = 'Donate Component implementation using TypeScript Next.js Stripe',
}: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="container">
      <header>
        <div className="header-content">
          <h1>
            <span className="light">Donating to Aseel through Stripe</span>
          </h1>
        </div>
      </header>
      {children}
    </div>
  </>
)

export default Layout
