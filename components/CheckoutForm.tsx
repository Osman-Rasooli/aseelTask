import React, { useState } from 'react'

import CustomDonationInput from '../components/CustomDonationInput'
import StripeTestCards from '../components/StripeTestCards'

import getStripe from '../utils/get-stripejs'
import { fetchPostJSON } from '../utils/api-helpers'
import { formatAmountForDisplay } from '../utils/stripe-helpers'
import * as config from '../config'

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    customDonation: config.MIN_AMOUNT,
  })
  const [tip, setTip] = useState({customTip: config.MIN_TIP});

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })
    const handleTipChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setTip({
      ...tip,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  let amount = ((tip.customTip * input.customDonation / 100) + parseInt(input.customDonation));

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Creating a Stripe Checkout Session.
    const response = await fetchPostJSON('/api/checkout_sessions', {
      amount
    })

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    // Redirecting to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <CustomDonationInput
        className="checkout-style"
        title='Donation Amount'
        name={'customDonation'}
        value={input.customDonation}
        min={config.MIN_AMOUNT}
        max={config.MAX_AMOUNT}
        step={config.AMOUNT_STEP}
        currency={config.CURRENCY}
        onChange={handleInputChange}
      />
      <CustomDonationInput
        className="checkout-style"
        title='Tip percentage'
        name={'customTip'}
        value={tip.customTip}
        min={config.MIN_TIP}
        max={config.MAX_TIP}
        step={config.AMOUNT_STEP}
        currency={config.CURRENCY}
        onChange={handleTipChange}
      />
      <StripeTestCards />
      <button
        className="checkout-style-background"
        type="submit"
        disabled={loading}
      >
        Donate {formatAmountForDisplay(amount, config.CURRENCY)}
      </button>
    </form>
  )
}

export default CheckoutForm
