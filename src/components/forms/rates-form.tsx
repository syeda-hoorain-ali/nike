"use client"

import { useCheckout } from "@/context/checkout-context"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { Button } from "../ui/button"
import { MouseEvent, useState } from "react"

const RatesForm = () => {

  const [error, setError] = useState<null | string>(null)
  const { rates, selectedRate, setSelectedRate, setAccordionValue } = useCheckout()

  if (!rates || rates.length == 0) return <p>Error getting rates. Please try again later</p>

  const filteredRates = rates.filter(rate => rate.validationStatus == "valid")

  if(filteredRates.length == 0) {
    const warningRates = rates.filter(rate => rate.validationStatus == "has_warnings");
    filteredRates.push(...warningRates)
  }

  const handleChange = (id: string) => {
    const rate = rates.find(item => item.rateId == id)
    setSelectedRate(rate || null)
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!selectedRate) {
      setError('Please select a rate')
      return
    }

    setAccordionValue('payment')
  }

  if (filteredRates.length == 0) return <p>Error getting rates. Please try again later</p>


  return (
    <div>
      <ToggleGroup
        size="lg"
        type="single"
        variant="outline"
        className="flex flex-wrap gap-2"
        onValueChange={handleChange}
      >
        
        {filteredRates.map(rate => (
          <ToggleGroupItem
            key={rate.rateId}
            value={rate.rateId}
            className="flex-col items-start gap-0 border border-black bg-slate-200 py-2 w-[calc(50%-0.5rem)] h-full"
          >
            <span className="text-xs">{rate.carrierFriendlyName}</span>
            <h5 className="text-lg font-semibold">{rate.serviceType}</h5>
            <span className="font-bold">{rate.shippingAmount.amount} {rate.shippingAmount.currency}</span>
            <span>Estimated delivery days: {rate.carrierDeliveryDays}</span>
          </ToggleGroupItem>
        ))}

      </ToggleGroup>

      {error &&
        <p className="text-destructive mt-2 -mb-4">{error}</p>
      }

      <Button onClick={handleSubmit} className="mt-8">Countinue</Button>
    </div>
  )
}

export default RatesForm
