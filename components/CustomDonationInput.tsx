import React from 'react'

type Props = {
  title: string
  name: string
  value: number
  min: number
  max: number
  currency: string
  step: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const CustomDonationInput = ({
  title,
  name,
  value,
  min,
  max,
  currency,
  step,
  onChange,
  className,
}: Props) => {
    return (
  <label>
    {title} ({min} - {max}) {title == 'Donation Amount' ? ' $' : ' %'}:
    <input
      className={className}
      type="number"
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    ></input>
    <input
      type="range"
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    ></input>
  </label>
)}

export default CustomDonationInput
