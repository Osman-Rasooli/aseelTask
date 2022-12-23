import { Stripe, loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  // process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  // pk_test_51MHLHYCJBglN19rBW93vtSR66WRObccii2mZJM2ZnrLZiUTvV3ZbO5DnOpxeHiPZrfy2etUonpLC0YA44kkqdfCI00DQwcK9Vr
  return stripePromise
}

export default getStripe
