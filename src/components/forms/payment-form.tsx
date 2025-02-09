"use client";

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { useShoppingCart } from "use-shopping-cart";
import { useCheckout } from "@/context/checkout-context";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentForm = () => {

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useShoppingCart();
  const { address, checkout } = useCheckout();
  const [loading, setLoading] = useState<boolean>(false);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email: address?.email,
      },
      redirect: 'if_required'
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return
    }

    await checkout()
    clearCart()
    toast.success("Payment successful");
    router.push('/success')
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button type="submit" disabled={loading || !stripe} className="mt-8 px-8">
        {loading ?? <Loader2Icon className="animate-spin" stroke="#fff" />}
        Pay
      </Button>
    </form>
  );
}

export default PaymentForm
