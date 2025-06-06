"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { trackOrder } from "@/lib/data";
import { TrackingResult } from "@/types/shipengine";
import { toast } from "react-toastify";

const Page = () => {

  const [trackingNumber, setTrackingNumber] = useState('')
  const [, setResult] = useState<TrackingResult>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('trackingNumber', trackingNumber)

    setLoading(true)
    const result = await trackOrder(trackingNumber)

    if (typeof result === 'string') {
      toast.error(result)
      setLoading(false)
      return
    }

    if (result.carrierStatusDescription?.includes("Invalid")) {
      setError(result.carrierStatusDescription)
    }

    console.log(result)
    setResult(result)
    setLoading(false)
  }


  return (
    <div className="flex flex-col items-center justify-center gap-4 my-20 px-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold">Track your order</h1>
      <p className="text-center">Enter your tracking number below to follow your order&apos;s journey and get the latest updates on its delivery status</p>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">

          <Input
            type="text"
            name="trackingNumber"
            placeholder="Tracking Number"
            value={trackingNumber}
            onChange={e => setTrackingNumber(e.target.value)}
          />

          <Button
            type="submit"
            className="h-9 px-6 rounded-md"
            disabled={loading}
          >
            Track
          </Button>
        </div>

        {error && (
          <p className="text-destructive text-sm px-2 py-1">{error}</p>
        )}
      </form>

      {/* <p className="text-center text-sm text-warning">
        This page is not functional in test mode. To see how it works, please visit the sample page
        <Link href="/tracking/sample">here</Link>.
      </p> */}

    </div>
  );
};

export default Page;