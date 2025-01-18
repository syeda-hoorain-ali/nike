import { Button } from "@/components/ui/button"

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center my8 pb-40 gap-4">

      <h1 className="text-4xl font-bold">Payment Successfull!</h1>

      <p className="max-w-xl text-center">Thank you for your purchase! Your transaction was successfully completed. We’re excited to have you onboard, and you can now enjoy our services seamlessly. Let us know if there’s anything we can do to enhance your experience!</p>

      <Button size="lg">Track your package</Button>

    </div>
  )
}

export default page


// 1,943.49