import { NextPage } from 'next'
import Layout from '../components/Layout'


import CheckoutForm from '../components/CheckoutForm'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Donate Component implementation using TypeScript Next.js Stripe">
      <div className="page-container">
        <h1>Donate to Aseel </h1>
        <p>Donate Component implementation using TypeScript, Nextjs, Stripe, Medusajs</p>
        <CheckoutForm />
      </div>
    </Layout>
  )
}

export default IndexPage
