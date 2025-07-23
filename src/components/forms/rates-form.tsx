"use client"

import { useCheckout } from "@/context/checkout-context"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { Button } from "../ui/button"
import { MouseEvent, useMemo, useState } from "react"

const RatesForm = () => {

  const [error, setError] = useState<null | string>(null)
  const { rates, selectedRate, setSelectedRate, setAccordionValue } = useCheckout()

  const filteredRates = useMemo(() => {
    const myRates = rates?.filter(rate => rate.validationStatus == "valid") || []

    if (myRates.length == 0) {
      const warningRates = rates?.filter(rate => rate.validationStatus == "has_warnings") || [];
      myRates.push(...warningRates)
    }

    const seen = new Set<string>();
    return myRates.filter(rate => {
      const key = `${rate.carrierFriendlyName}|${rate.serviceType}|${rate.shippingAmount.amount}|${rate.shippingAmount.currency}|${rate.carrierDeliveryDays}`;

      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [rates])

  const handleChange = (id: string) => {
    const rate = filteredRates.find(item => item.rateId == id)
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
            <span className="text-xs text-gray-700">{rate.carrierFriendlyName}</span>
            <h5 className="text-lg font-semibold">{rate.serviceType}</h5>
            <span className="font-bold text-gray-950">{rate.shippingAmount.amount} {rate.shippingAmount.currency}</span>
            <span className="text-gray-700">Estimated delivery days: {rate.carrierDeliveryDays}</span>
          </ToggleGroupItem>
        ))}

      </ToggleGroup>

      {error &&
        <p className="text-destructive mt-2 -mb-4">{error}</p>
      }

      <Button onClick={handleSubmit} className="mt-8">Continue</Button>
    </div>
  )
}

export default RatesForm
