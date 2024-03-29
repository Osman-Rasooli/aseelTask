import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Layout from '../components/Layout'
import PrintObject from '../components/PrintObject'


import { fetchGetJSON } from '../utils/api-helpers'
import useSWR from 'swr'

const ResultPage: NextPage = () => {
  const router = useRouter()

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  )

  if (error) return <div>failed to load</div>

  return (
    <Layout title="Checkout Payment Result | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
        <Link href="/"><h5>Back to Donate</h5></Link>
      </div>
    </Layout>
  )
}

export default ResultPage
