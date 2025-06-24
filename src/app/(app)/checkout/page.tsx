import CheckoutPage from "@/components/checkout-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase.",
}

export default function Page() {
  return <CheckoutPage />;
}
